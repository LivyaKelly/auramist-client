import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import styles from "@/styles/serviceCard.module.css";
import api from "@/utils/api";
import { toast } from "react-toastify";

export default function ServiceCard() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isReservaModalOpen, setIsReservaModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  const [dataSelecionada, setDataSelecionada] = useState("");
  const [horaSelecionada, setHoraSelecionada] = useState("");

  useEffect(() => {
    const fetchServicos = async () => {
      try {
        const response = await api.get("/api/services");
        setServicos(response.data.servicos || []);
      } catch (error) {
        console.error("Erro ao buscar serviços:", error);
        setError("Não foi possível carregar os serviços.");
      } finally {
        setLoading(false);
      }
    };
    fetchServicos();
  }, []);

  const abrirReservaModal = (servico) => {
    setServicoSelecionado(servico);
    setIsReservaModalOpen(true);
  };

  const avancarParaConfirmacao = () => {
    if (!dataSelecionada || !horaSelecionada) {
      toast.error("Por favor, selecione data e hora!");
      return;
    }
    setIsReservaModalOpen(false);
    setIsConfirmModalOpen(true);
  };

  const confirmarAgendamento = async () => {
    try {
      setIsConfirmModalOpen(false);
      await api.post("/api/appointments", {
        serviceId: servicoSelecionado.id,
        date: dataSelecionada,
        time: horaSelecionada,
      });
      toast.success("Agendamento confirmado com sucesso!");
    } catch (error) {
      console.error("❌ Erro no agendamento:", error);
      const errorMessage =
        error.response?.data?.mensagem || "Erro ao confirmar o agendamento.";
      toast.error(errorMessage);
    }
  };

  if (loading) return <p>A carregar serviços...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className={styles.servicosContainer}>
      <div className={styles.listaServicos}>
        {servicos.length > 0 ? (
          servicos.map((servico) => (
            <div key={servico.id} className={styles.cartaoServico}>
              <Image
                src={servico.urlImage}
                alt={servico.name}
                width={300}
                height={180}
                className={styles.imagemCard}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.nomeServico}>{servico.name}</h3>
                <p className={styles.descricaoServico}>
                  {servico.description || "Descrição não disponível."}
                </p>
                <div className={styles.infoBottom}>
                  <span className={styles.preco}>R${servico.price.toFixed(2)}</span>
                  <span className={styles.tempo}>⏱ {servico.duration} min</span>
                </div>
                <button
                  className={styles.btnReservar}
                  onClick={() => abrirReservaModal(servico)}
                >
                  Reservar
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum serviço disponível.</p>
        )}
      </div>

      {/* MODAL 1 - RESERVA */}
      {isReservaModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <h3>Reserva</h3>
            <p>
              <strong>Serviço:</strong> {servicoSelecionado?.name}
            </p>
            <label>
              <p>Selecione uma data:</p>
              <input
                type="date"
                onChange={(e) => setDataSelecionada(e.target.value)}
              />
            </label>
            <label>
              <p>Selecione um horário:</p>
              <input
                type="time"
                onChange={(e) => setHoraSelecionada(e.target.value)}
              />
            </label>
            <div className={styles.modalButtons}>
              <button onClick={() => setIsReservaModalOpen(false)}>Cancelar</button>
              <button onClick={avancarParaConfirmacao}>Continuar</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2 - CONFIRMAÇÃO */}
      {isConfirmModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <h3>Confirmação do Agendamento</h3>
            <p>
              <strong>Serviço Selecionado:</strong> {servicoSelecionado?.name}
            </p>
            <p>
              <strong>Data e Horário:</strong>{" "}
              {dayjs(dataSelecionada).format("DD/MM/YYYY")} às {horaSelecionada}
            </p>
            <p>
              <strong>Profissional:</strong>{" "}
              {servicoSelecionado?.professionalName || "Não informado"}
            </p>
            <p>
              <strong>Valor Total:</strong> R${" "}
              {servicoSelecionado?.price.toFixed(2)}
            </p>
            <div className={styles.modalButtons}>
              <button onClick={() => setIsConfirmModalOpen(false)}>Voltar</button>
              <button onClick={confirmarAgendamento}>Confirmar Agendamento</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
