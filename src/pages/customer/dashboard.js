import React, { useEffect, useState } from "react";
import SideBarClient from "@/components/customerSidebar";
import Carrossel from "@/components/carousel";
import CardServicos from "@/components/serviceCard";
import styles from "@/styles/dashboard.module.css";
import withAuth from "@/utils/withAuth";
import api from "@/utils/api"; // 1. Importar nossa instância do Axios

function DashboardCliente() {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  // O estado 'services' não é mais necessário aqui, pois 'CardServicos' busca seus próprios dados.

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 2. Usar api.get para buscar os dados do usuário.
        // A rota correta é /api/users/protected
        const response = await api.get('/api/users/protected');
        const userData = response.data;
        setUserName(userData.name?.split(" ")[0] ?? "Cliente");
      } catch (err) {
        console.error("Erro ao carregar dados do usuário:", err);
      } finally {
        // O loading é controlado pelo componente CardServicos agora
        setLoading(false);
      }
    };

    fetchUserData();
  }, []); // A dependência da API_URL foi removida

  return (
    <div className={styles.paginaContainer}>
      <SideBarClient />
      <div className={styles.conteudoPrincipal}>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <>
            <h2 className={styles.saudacaoCentralizada}>
              Olá, <span className={styles.nomeDestaque}>{userName}</span>
            </h2>
            <Carrossel />
            <h3 className={styles.subtitulo}>Serviços disponíveis:</h3>
            {/* 3. O componente CardServicos agora é responsável por buscar e exibir
                 os serviços, incluindo seus próprios estados de 'loading' e 'error'.
                 Não precisamos mais passar props para ele.
            */}
            <CardServicos />
          </>
        )}
      </div>
    </div>
  );
}

// O HOC withAuth garante que apenas usuários com o papel 'CLIENT' possam ver esta página.
export default withAuth(DashboardCliente, ["CLIENT"]);
