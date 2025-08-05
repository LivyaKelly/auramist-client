import styles from "@/styles/customerSidebar.module.css";
import {
  FiBriefcase,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CustomerSideBar() {
  const router = useRouter();

  const handleLogout = () => {
    // 1. Remove o token e o papel do usuário do localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');

    // 2. Redireciona para a página inicial
    router.push("/");
  };

  return (
    <div className={styles.barraLateral}>
      <div className={styles.logo}>
        <Image
          src="/img/logos/AURAMIST-Logo.svg"
          alt="Logo do Auramist"
          width={100}
          height={170}
          className={styles.logoFooter}
        />
      </div>

      <nav className={styles.navegacao}>
        <ul>
          <li
            className={`${styles.menuItem} ${
              router.pathname === "/customer/appointments" ? styles.active : ""
            }`}
            onClick={() => router.push("/customer/appointments")}
          >
            <FaCalendarAlt className={styles.icone} /> Agendamento
          </li>
          <li
            className={`${styles.menuItem} ${
              router.pathname === "/customer/dashboard" ? styles.active : ""
            }`}
            onClick={() => router.push("/customer/dashboard")}
          >
            <FiBriefcase className={styles.icone} /> Serviços
          </li>
          <li
            className={`${styles.menuItem} ${
              router.pathname === "/customer/profileCustomer" ? styles.active : ""
            }`}
            onClick={() => router.push("/customer/profileCustomer")}
          >
            <FiUser className={styles.icone} /> Perfil
          </li>
        </ul>
      </nav>

      <div className={styles.sair} onClick={handleLogout}>
        <FiLogOut className={styles.icone} />
        <span>Sair</span>
      </div>
    </div>
  );
}
