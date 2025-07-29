import React, { useEffect, useState } from "react";
import SideBarClient from "@/components/customerSidebar";
import Carrossel from "@/components/carousel";
import CardServicos from "@/components/serviceCard";
import styles from "@/styles/dashboard.module.css";
import withAuth from "@/utils/withAuth";

function DashboardCliente() {
  const [userName, setUserName] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resUser = await fetch("http://localhost:3002/api/protected", {
          credentials: "include",
        });
        const userData = await resUser.json();
        setUserName(userData.name?.split(" ")[0] ?? "Cliente");

        const resServices = await fetch("http://localhost:3002/api/services", {
          credentials: "include",
        });
        const data = await resServices.json();
        setServices(data.servicos || []);
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.paginaContainer}>
      <SideBarClient />
      <div className={styles.conteudoPrincipal}>
        <h2 className={styles.saudacaoCentralizada}>
          Olá, <span className={styles.nomeDestaque}>{userName}</span>
        </h2>

        <Carrossel />

        {/* <p className={styles.textoInfo}>
          Aqui você pode visualizar os serviços disponíveis e agendar.
        </p> */}

        <h3 className={styles.subtitulo}>Serviços disponíveis:</h3>

        {loading ? (
          <p>Carregando...</p>
        ) : services.length === 0 ? (
          <p>Nenhum serviço disponível no momento.</p>
        ) : (
          <CardServicos services={services} />
        )}
      </div>
    </div>
  );
}

export default withAuth(DashboardCliente, "CLIENT");
