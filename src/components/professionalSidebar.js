import styles from "@/styles/professionalSidebar.module.css";
import { FiFolder, FiUser, FiLogOut, FiBarChart2, FiX } from "react-icons/fi";
import Image from "next/image";
import { useRouter } from "next/router";

export default function BarraLateral({ isOpen = false, onClose = () => {} }) {
  const router = useRouter();

  const handleLogout = () => {
    try {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
    } catch (e) {}
    router.push("/");
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.barraLateral} ${isOpen ? styles.open : ""}`}>
        <button
          type="button"
          aria-label="Fechar menu"
          className={styles.closeBtn}
          onClick={onClose}
        >
          <FiX size={18} />
        </button>

        <div className={styles.logo}>
          <Image
            src="/img/logos/AURAMIST-Logo.svg"
            alt="Logo do Auramist"
            width={100}
            height={170}
          />
        </div>

        <nav className={styles.navegacao}>
          <ul>
            <li
              className={`${styles.menuItem} ${
                router.pathname === "/professional/appointments"
                  ? styles.active
                  : ""
              }`}
              onClick={() => {
                router.push("/professional/appointments");
                onClose();
              }}
            >
              <FiFolder className={styles.icone} /> Reservas
            </li>

            <li
              className={`${styles.menuItem} ${
                router.pathname === "/professional/dashboard"
                  ? styles.active
                  : ""
              }`}
              onClick={() => {
                router.push("/professional/dashboard");
                onClose();
              }}
            >
              <FiBarChart2 className={styles.icone} /> Dashboard
            </li>

            <li
              className={`${styles.menuItem} ${
                router.pathname === "/professional/profileProfessional"
                  ? styles.active
                  : ""
              }`}
              onClick={() => {
                router.push("/professional/profileProfessional");
                onClose();
              }}
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
    </>
  );
}
