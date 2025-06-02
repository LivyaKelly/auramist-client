import { useEffect, useState } from "react";
import styles from "@/styles/appointments.module.css";
import { Card } from "antd";
import dayjs from "dayjs";
import SideBarClient from "@/components/customerSidebar";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/appointments", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Erro ao buscar agendamentos");

        const data = await res.json();
        setAppointments(data.agendamentos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <p>Carregando agendamentos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className={styles.container}>
      <SideBarClient />
      <h2 className={styles.titulo}>Meus Agendamentos</h2>
      {appointments.length === 0 ? (
        <p>Você ainda não possui agendamentos.</p>
      ) : (
        <div className={styles.lista}>
          {appointments.map((appt) => (
            <Card key={appt.id} className={styles.card}>
              <h3>{appt.serviceName}</h3>
              <p>
                <strong>Data:</strong> {dayjs(appt.date).format("DD/MM/YYYY")}
              </p>
              <p>
                <strong>Horário:</strong> {appt.time}
              </p>
              <p>
                <strong>Profissional:</strong> {appt.professionalName}
              </p>
              <p>
                <strong>Duração:</strong> {appt.duration} minutos
              </p>
              <p>
                <strong>Valor:</strong> R$ {appt.price.toFixed(2)}
              </p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
