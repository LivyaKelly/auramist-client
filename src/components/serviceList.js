import { useEffect, useState } from "react";
import styles from "@/styles/serviceList.module.css";

export default function ServiceList() {
  const [servicos, setServicos] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function buscarServicos() {
      try {
        const res = await fetch(`${API_URL}/api/services`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Erro ao buscar serviços");
        const data = await res.json();
        setServicos(data.servicos || []);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err);
      }
    }

    buscarServicos();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.titulo}>Seus Serviços</h3>
      <div className={styles.grid}>
        {servicos.map((servico) => (
          <div key={servico.id} className={styles.card}>
            <img src={servico.urlImage} alt={servico.name} />
            <h4>{servico.name}</h4>
            <p>{servico.description}</p>
            <p>
              <strong>Duração:</strong> {servico.duration} min
            </p>
            <p>
              <strong>Preço:</strong> R$ {servico.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
