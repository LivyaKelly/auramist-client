import styles from "@/styles/customerSidebar.module.css";
import { FiBriefcase, FiUser, FiLogOut, FiX } from "react-icons/fi";
import { FaCalendarAlt } from "react-icons/fa";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CustomerSideBar({ isOpen = false, onClose = () => {} }) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    router.push("/");
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      <aside
        className={`${styles.barraLateral} ${isOpen ? styles.open : ""}`}
        aria-hidden={!isOpen}
      >
        <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu">
          <FiX size={22} />
        </button>

        <div className={styles.logo}>
          <Image
            src="/img/logos/AURAMIST-Logo.svg"
            alt="Logo do Auramist"
            width={360}  
            height={170}
            className={styles.logoFooter}
          />
        </div>

        <nav className={styles.navegacao}>
          <ul>
            <li
              className={`${styles.menuItem} ${router.pathname === "/customer/appointments" ? styles.active : ""}`}
              onClick={() => { router.push("/customer/appointments"); onClose(); }}
            >
              <FaCalendarAlt className={styles.icone} /> Agendamento
            </li>
            <li
              className={`${styles.menuItem} ${router.pathname === "/customer/dashboard" ? styles.active : ""}`}
              onClick={() => { router.push("/customer/dashboard"); onClose(); }}
            >
              <FiBriefcase className={styles.icone} /> Serviços
            </li>
            <li
              className={`${styles.menuItem} ${router.pathname === "/customer/profileCustomer" ? styles.active : ""}`}
              onClick={() => { router.push("/customer/profileCustomer"); onClose(); }}
            >
              <FiUser className={styles.icone} /> Perfil
            </li>
          </ul>
        </nav>

        <div className={styles.sair} onClick={handleLogout}>
          <FiLogOut className={styles.icone} />
          <span>Sair</span>
        </div>
      </aside>
    </>
  );
}
