import { useEffect, useState } from "react";
import styles from "@/styles/appointments.module.css";
import dayjs from "dayjs";
import SideBarClient from "@/components/customerSidebar";
import withAuth from "@/utils/withAuth";
import api from "@/utils/api";
import { FiMenu } from "react-icons/fi";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalData, setModalData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const [userResponse, appointmentsResponse] = await Promise.all([
          api.get("/api/users/protected"),
          api.get("/api/appointments"),
        ]);
        const userData = userResponse.data;
        setUserName(userData.name?.split(" ")[0] || "Cliente");

        const appointmentsData = appointmentsResponse.data;
        setAppointments(appointmentsData.agendamentos || []);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndAppointments();
  }, []);

  const cancelarAgendamento = async (id) => {
    try {
      await api.delete(`/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
      setModalData(null);
    } catch (err) {
      console.error("Erro ao cancelar agendamento:", err);
      alert("Não foi possível cancelar o agendamento. Tente novamente.");
    }
  };

  return (
    <div className={styles.paginaContainer}>
      <SideBarClient isOpen={menuOpen} onClose={() => setMenuOpen(false)} />

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

      <div className={styles.conteudoPrincipal}>
        <h2 className={styles.titulo}>Meus Agendamentos</h2>

        {loading ? (
          <p>Carregando...</p>
        ) : appointments.length === 0 ? (
          <p className={styles.semAgendamentos}>
            Você ainda não possui agendamentos.
          </p>
        ) : (
          <div className={styles.grid}>
            {appointments.map((appt) => (
              <div key={appt.id} className={styles.card}>
                {appt.service?.urlImage && (
                  <img src={appt.service.urlImage} alt={appt.service.name} />
                )}
                <h3>{appt.service?.name}</h3>
                <p>
                  <strong>Data:</strong> {dayjs(appt.date).format("DD/MM/YYYY")}
                </p>
                <button
                  className={styles.botao}
                  onClick={() => setModalData(appt)}
                  type="button"
                >
                  Visualizar Agendamento
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {modalData && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setModalData(null)}
          />
          <div className={styles.modal} role="dialog" aria-modal="true">
            <h3>Confirmação de Agendamento</h3>
            {modalData.service?.urlImage && (
              <img
                src={modalData.service.urlImage}
                alt="Serviço"
                className={styles.modalImagem}
              />
            )}
            <p>
              Olá <strong>{userName}</strong>! 👋🏼
              <br />
              Seu agendamento está marcado para o dia{" "}
              <strong>{dayjs(modalData.date).format("DD/MM/YYYY")}</strong> às{" "}
              <strong>{dayjs(modalData.date).format("HH:mm")}</strong>.
              <br />
              Serviço agendado:{" "}
              <strong>{modalData.service?.name || "N/D"}</strong>
              <br />
              Profissional:{" "}
              <strong>{modalData.professional?.name || "N/D"}</strong>
            </p>
            <button
              className={styles.cancelar}
              onClick={() => cancelarAgendamento(modalData.id)}
              type="button"
            >
              Cancelar Agendamento ❌
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default withAuth(Appointments, ["CLIENT"]);
