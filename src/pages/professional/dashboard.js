import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "@/components/professionalSidebar";
import styles from "@/styles/professionalDashboard.module.css";
import ServicoForm from "@/components/serviceForm";
import ListaServicos from "@/components/serviceList";
import withAuth from "@/utils/withAuth";
import api from "@/utils/api";
import { FiMenu } from "react-icons/fi";

function ProfessionalDashboard() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/protected");
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
    setRefreshKey((oldKey) => oldKey + 1);
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.paginaContainer}>
      <SideBar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={styles.topbarMobile}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          type="button"
        >
          <FiMenu size={24} />
        </button>
        <h2 className={styles.topbarTitle}>
          Olá, <span className={styles.nomeDestaque}>{firstName}</span>
        </h2>
      </div>

      <div className={styles.conteudoPrincipal}>
        <div className={styles.saudacaoCentralizada}>
          <p>
            Olá, <span className={styles.nomeDestaque}>{firstName}</span>
          </p>
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
