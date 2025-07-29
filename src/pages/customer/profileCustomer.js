import { useEffect, useState } from "react";
import styles from "@/styles/profile.module.css";
import SideBarClient from "@/components/customerSidebar";
import withAuth from "@/utils/withAuth";

function ProfileCustomer() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/protected", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar usuário");

        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Erro ao buscar usuário:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className={styles.paginaContainer}>
      <SideBarClient />
      <div className={styles.conteudoPrincipal}>
        <h2 className={styles.titulo}>Meu Perfil</h2>

        <div className={styles.dadosPerfil}>
          <p className={styles.dado}>
            <strong>Nome:</strong> {user.name}
          </p>
          <p className={styles.dado}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles.dado}>
            <strong>Telefone:</strong> {user.phone}
          </p>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfileCustomer, "CLIENT");
