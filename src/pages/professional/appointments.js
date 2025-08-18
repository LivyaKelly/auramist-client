import { useEffect, useState } from "react";
import ProfessionalSidebar from "@/components/professionalSidebar";
import withAuth from "@/utils/withAuth";
import styles from "@/styles/professionalAppointments.module.css";
import Image from "next/image";
import api from "@/utils/api";
import { FiMenu } from "react-icons/fi";

function ProfessionalAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await api.get("/api/appointments/professional");
        const data = response.data;
        if (Array.isArray(data.agendamentos)) {
          setAppointments(data.agendamentos);
        } else {
          console.error("Formato de dados inválido:", data);
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
    try {
      await api.delete(`/api/appointments/professional/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      const message =
        err.response?.data?.mensagem || "Erro inesperado ao cancelar agendamento.";
      alert(message);
    }
  };

  return (
    <div className={styles.container}>
      <ProfessionalSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className={styles.topbarMobile}>
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMenuOpen(true)}
          aria-label="Abrir menu"
          type="button"
        >
          <FiMenu size={24} />
        </button>
        <h2 className={styles.topbarTitle}>Meus Agendamentos</h2>
      </div>

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
                  src={appt.service?.urlImage || "/img/icons/default-service.png"}
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
                  type="button"
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
