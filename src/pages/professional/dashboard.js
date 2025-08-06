import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "@/components/professionalSidebar";
import styles from "@/styles/dashboard.module.css";
import ServicoForm from "@/components/serviceForm";
import ListaServicos from "@/components/serviceList";
import withAuth from "@/utils/withAuth";
import api from "@/utils/api";

function ProfessionalDashboard() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/users/protected');
        const userData = response.data;
        setFirstName(userData.name?.split(" ")[0] ?? "Profissional");
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleServiceSuccess = () => {
    console.log("Serviço criado! Atualizando a lista...");
    setRefreshKey(oldKey => oldKey + 1);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.paginaContainer}>
      <SideBar />
      <div className={styles.conteudoPrincipal}>
        {/* Cabeçalho do Dashboard com saudação e botão de perfil */}
        <div className={styles.dashboardHeader}>
          <div className={styles.saudacaoCentralizada}>
            <p>
              Olá, <span className={styles.nomeDestaque}>{firstName}</span>
            </p>
          </div>
        </div>

        <div className={styles.linhaConteudo}>
          <ServicoForm onSuccess={handleServiceSuccess} />
          <ListaServicos key={refreshKey} />
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfessionalDashboard, ["PROFESSIONAL"]);
