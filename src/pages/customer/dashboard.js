import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar from "@/components/customerSidebar";
import Carrossel from "@/components/carousel";
import CardServicos from "@/components/serviceCard";
import styles from "@/styles/dashboard.module.css";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/protected", {
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
  }, [router]);

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
        <Carrossel />
        <CardServicos />
      </div>
    </div>
  );
}
