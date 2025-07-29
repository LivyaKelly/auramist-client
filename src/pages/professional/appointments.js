import { useEffect, useState } from "react";
import ProfessionalSidebar from "@/components/professionalSidebar";
import withAuth from "@/utils/withAuth";
import styles from "@/styles/professionalAppointments.module.css";
import Image from "next/image";

function ProfessionalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch(
          "http://localhost:3002/api/appointments/professional",
          {
            credentials: "include",
          }
        );
        const data = await res.json();

        if (Array.isArray(data.agendamentos)) {
          setAppointments(data.agendamentos);
        } else {
          console.error("Formato inválido:", data);
        }
      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancel = async (id) => {
    const confirm = window.confirm("Deseja cancelar este agendamento?");
    if (!confirm) return;

    try {
      const role = localStorage.getItem("userRole");

      const rota =
        role === "PROFESSIONAL"
          ? `http://localhost:3002/api/appointments/professional/${id}`
          : `http://localhost:3002/api/appointments/${id}`;

      const res = await fetch(rota, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (res.ok) {
        setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      } else {
        alert(data.mensagem || "Erro ao cancelar agendamento.");
      }
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      alert("Erro inesperado ao cancelar agendamento.");
    }
  };

  return (
    <div className={styles.container}>
      <ProfessionalSidebar />
      <main className={styles.main}>
        <h1 className={styles.title}>Meus Agendamentos</h1>

        {loading ? (
          <p>Carregando agendamentos...</p>
        ) : appointments.length === 0 ? (
          <p>Nenhum agendamento encontrado.</p>
        ) : (
          <div className={styles.cardGrid}>
            {appointments.map((appt) => (
              <div className={styles.card} key={appt.id}>
                <Image
                  src={
                    appt.service?.urlImage || "/img/icons/default-service.png"
                  }
                  alt="Imagem do serviço"
                  width={400}
                  height={200}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h3>{appt.service?.name}</h3>
                  <p>
                    <strong>Cliente:</strong> {appt.client?.name}
                  </p>
                  <p>
                    <strong>Data:</strong>{" "}
                    {new Date(appt.date).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Hora:</strong> {appt.time || "Horário indefinido"}
                  </p>
                  <p>
                    <strong>Status:</strong> {appt.status}
                  </p>
                </div>
                <button
                  className={styles.cancelButton}
                  onClick={() => handleCancel(appt.id)}
                >
                  Cancelar Agendamento
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default withAuth(ProfessionalAppointments, ["PROFESSIONAL"]);
