import { useState } from "react";
import { useRouter } from "next/router";
import api from "@/utils/api"; // Usar nossa instância do Axios
import { toast } from "react-toastify";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/signup.module.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("CLIENT");
  const [profilePicture, setProfilePicture] = useState(null); // 1. Estado para a foto
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePicture(e.target.files[0]);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // 2. Usar FormData para enviar a imagem junto com os outros dados
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("role", role);
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      // 3. Enviar os dados com Axios
      await api.post('/api/auth/register', formData);
      
      toast.success("Cadastro realizado com sucesso! Redirecionando...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {
      console.error("Erro no cadastro:", error);
      const message = error.response?.data?.message || "Erro ao realizar o cadastro.";
      toast.error(message);
    }
  };

  return (
    <div className={styles.cadastroContainer}>
      <div className={styles.formContainer}>
        <Image
          src="/img/logos/Logo-vertical.svg"
          alt="Auramist Logo"
          width={150}
          height={150}
        />
        <form onSubmit={handleSignup}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className={styles.input}
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className={styles.input}
            required
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            className={styles.input}
          />
          <div className={styles.passwordField}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className={styles.input}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className={styles.eyeButton}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
          
          {/* 4. Novo campo para upload da foto */}
          <div className={styles.fileInputContainer}>
            <label htmlFor="profilePicture" className={styles.fileInputLabel}>
              Foto de Perfil (Opcional)
            </label>
            <input
              id="profilePicture"
              type="file"
              accept="image/*"
              className={styles.input}
              onChange={handleFileChange}
            />
          </div>

          <div className={styles.radioGroup}>
            <label>
              <input
                type="radio"
                value="CLIENT"
                checked={role === "CLIENT"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              Cliente
            </label>
            <label>
              <input
                type="radio"
                value="PROFESSIONAL"
                checked={role === "PROFESSIONAL"}
                onChange={(e) => setRole(e.target.value)}
              />{" "}
              Profissional
            </label>
          </div>
          <button type="submit" className={styles.cadastroButton}>
            Cadastrar
          </button>
          <p className={styles.loginLink}>
            Já tem conta? <Link href="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
