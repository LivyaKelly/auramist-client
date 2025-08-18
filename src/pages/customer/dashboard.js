import React, { useEffect, useState } from "react";
import SideBarClient from "@/components/customerSidebar";
import Carrossel from "@/components/carousel";
import CardServicos from "@/components/serviceCard";
import styles from "@/styles/customerDashboard.module.css";
import withAuth from "@/utils/withAuth";
import api from "@/utils/api";
import { FiMenu } from "react-icons/fi";

function DashboardCliente() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/api/users/protected');
        const userData = response.data;
        setUserName(userData.name?.split(" ")[0] ?? "Cliente");
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className={styles.paginaContainer}>
      <SideBarClient isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={styles.topbarMobile}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
        >
          <FiMenu size={24} />
        </button>
        <h2 className={styles.topbarTitle}>
          Olá, <span className={styles.nomeDestaque}>{userName}</span>
        </h2>
      </div>

      <main className={styles.conteudoPrincipal}>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <h2 className={styles.saudacaoCentralizada}>
              Olá, <span className={styles.nomeDestaque}>{userName}</span>
            </h2>

            <Carrossel />

            <h3 className={styles.subtitulo}>Serviços disponíveis:</h3>
            <CardServicos />
          </>
        )}
      </main>
    </div>
  );
}

export default withAuth(DashboardCliente, ["CLIENT"]);
