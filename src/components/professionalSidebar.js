import styles from "@/styles/professionalSidebar.module.css";
import { FiFolder, FiUser, FiLogOut, FiBarChart2 } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BarraLateral() {
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
              router.pathname === "/professional/appointments" ? styles.active : ""
            }`}
            onClick={() => router.push("/professional/appointments")}
          >
            <FiFolder className={styles.icone} /> Reservas
          </li>

          <li
            className={`${styles.menuItem} ${
              router.pathname === "/professional/dashboard" ? styles.active : ""
            }`}
            onClick={() => router.push("/professional/dashboard")}
          >
            <FiBarChart2 className={styles.icone} /> Dashboard
          </li>

          <li
            className={`${styles.menuItem} ${
              router.pathname === "/professional/profileProfessional" ? styles.active : ""
            }`}
            onClick={() => router.push("/professional/profileProfessional")}
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
