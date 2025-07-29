import { useState } from "react";
import { useRouter } from "next/router";
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
      const res = await fetch("http://localhost:3002/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Erro ao realizar login");
        return;
      }

      toast.success(`Bem-vindo(a), ${data.name?.split(" ")[0]}! 🎉`);

      setTimeout(() => {
        if (data.role === "CLIENT") {
          localStorage.setItem("userRole", "CLIENT");
          router.push("/customer/dashboard");
        } else if (data.role === "PROFESSIONAL") {
          localStorage.setItem("userRole", "PROFESSIONAL");
          router.push("/professional/dashboard");
        } else {
          toast.error("Tipo de usuário não reconhecido.");
        }
      }, 1000);
    } catch (error) {
      console.error("Erro no login:", error);
      toast.error("Erro de conexão com o servidor.");
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
