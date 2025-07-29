import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "@/components/professionalSidebar";
import styles from "@/styles/dashboard.module.css";
import ServicoForm from "@/components/serviceForm";
import ListaServicos from "@/components/serviceList";
import withAuth from "@/utils/withAuth";

function ProfessionalDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);
  const [servicos, setServicos] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`${API_URL}/api/services/my`, {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar serviços");
        const data = await res.json();
        setServicos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchServices();
  }, [API_URL]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/protected`, {
          credentials: "include",
        });
        if (!res.ok) return router.push("/login");

        const data = await res.json();
        setUser(data);
        setFirstName(data.name?.split(" ")[0] ?? "Usuário");
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router, API_URL]);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.paginaContainer}>
      <SideBar />
      <div className={styles.conteudoPrincipal}>
        <div className={styles.saudacaoCentralizada}>
          <p>
            Olá, <span className={styles.nomeDestaque}>{firstName}</span>
          </p>
        </div>
        <div className={styles.linhaConteudo}>
          <ServicoForm onSuccess={() => console.log("Serviço criado!")} />
          <ListaServicos />
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfessionalDashboard, ["PROFESSIONAL"]);
