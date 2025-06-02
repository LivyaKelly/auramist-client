import styles from "@/styles/customerSidebar.module.css";
import {
  FiFolder,
  FiBriefcase,
  FiHeart,
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
              router.pathname === "/cliente/agendamentos" ? styles.active : ""
            }`}
            onClick={() => router.push("/cliente/agendamentos")}
          >
            <FaCalendarAlt className={styles.icone} /> Agendamento
          </li>
          <li
            className={`${styles.menuItem} ${
              router.pathname === "/cliente/dashboard" ? styles.active : ""
            }`}
            onClick={() => router.push("/cliente/dashboard")}
          >
            <FiBriefcase className={styles.icone} /> Serviços
          </li>
          {/* <li className={`${styles.menuItem} ${router.pathname === "/favoritos" ? styles.active : ""}`}
                        onClick={() => router.push('/favoritos')}>
                        <FiHeart className={styles.icone} /> Favoritos
                    </li> */}
          <li
            className={`${styles.menuItem} ${
              router.pathname === "/cliente/perfil" ? styles.active : ""
            }`}
            onClick={() => router.push("/cliente/perfil")}
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
