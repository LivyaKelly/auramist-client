import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api"; 
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/login.module.css";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const data = response.data;

      localStorage.setItem('authToken', data.token);
      localStorage.setItem("userRole", data.role);

      toast.success(`Bem-vindo(a), ${data.name?.split(" ")[0]}! 🎉`);

      setTimeout(() => {
        if (data.role === "CLIENT") {
          router.push("/customer/dashboard");
        } else if (data.role === "PROFESSIONAL") {
          router.push("/professional/dashboard");
        } else {
          toast.error("Tipo de usuário não reconhecido.");
        }
      }, 1000);

    } catch (error) {
      console.error("Ocorreu um erro ao tentar fazer o login:", error);
      if (error.response) {
        toast.error(error.response.data.message || "Erro no login. Verifique seus dados.");
      } else if (error.request) {
        toast.error("Não foi possível conectar ao servidor. Tente novamente mais tarde.");
      } else {
        toast.error("Ocorreu um erro inesperado. Verifique o console.");
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.formContainer}>
        <Image
          src="/img/logos/Logo-vertical.svg"
          alt="Auramist Logo"
          width={150}
          height={150}
        />
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite o seu email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.eyeButton}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>

          <div className={styles.links}>
            <Link href="/recuperar-senha">Esqueceu a senha?</Link>
          </div>

          <button type="submit" className={styles.loginButton}>
            Entrar
          </button>

          <p className={styles.singinLink}>
            Não tem conta? <Link href="/signup">Criar uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
