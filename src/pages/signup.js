import { useState } from "react";
import { useRouter } from "next/router";
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSignup = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3002/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password, role }),
    });
    const data = await res.json();
    if (!res.ok) setError(data.message || "Erro no cadastro");
    else router.push("/login");
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
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
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
        {error && <p className={styles.errorMessage}>{error}</p>}
      </div>
    </div>
  );
}
