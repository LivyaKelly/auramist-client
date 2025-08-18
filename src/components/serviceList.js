import styles from "@/styles/serviceList.module.css";
import api from "@/utils/api";
import { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export default function ListaServicos() {
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const fetchMyServices = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/services/my");
      setServicos(response.data || []);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
      toast.error("Não foi possível carregar seus serviços.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyServices();
  }, [fetchMyServices]);

  const handleDelete = async (serviceId) => {
    if (!window.confirm("Tem certeza que deseja apagar este serviço? Esta ação é irreversível.")) {
      return;
    }
    try {
      await api.delete(`/api/services/${serviceId}`);
      setServicos((prevServicos) => prevServicos.filter((s) => s.id !== serviceId));
      toast.success("Serviço apagado com sucesso!");
    } catch (err) {
      console.error("Erro ao apagar serviço:", err);
      toast.error("Não foi possível apagar o serviço.");
    }
  };

  const handleEdit = (servico) => {
    setEditingService(servico);
    setIsEditModalOpen(true);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    if (!editingService) return;

    try {
      const updatedData = {
        name: editingService.name,
        description: editingService.description,
        duration: Number(editingService.duration),
        price: parseFloat(editingService.price),
      };

      const response = await api.put(`/api/services/${editingService.id}`, updatedData);
      setServicos((prev) =>
        prev.map((s) => (s.id === editingService.id ? response.data.servico : s))
      );
      setIsEditModalOpen(false);
      setEditingService(null);
      toast.success("Serviço atualizado com sucesso!");
    } catch (err) {
      console.error("Erro ao atualizar serviço:", err);
      toast.error("Não foi possível atualizar o serviço.");
    }
  };

  if (loading) {
    return <p>A carregar os seus serviços...</p>;
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.titulo}>Os Seus Serviços Cadastrados</h3>

        <div className={styles.grid}>
          {servicos.length > 0 ? (
            servicos.map((servico) => (
              <div key={servico.id} className={styles.card}>
                <img src={servico.urlImage} alt={servico.name} />
                <h4>{servico.name}</h4>
                <p>{servico.description}</p>
                <p><strong>Duração:</strong> {servico.duration} min</p>
                <p><strong>Preço:</strong> R$ {Number(servico.price).toFixed(2)}</p>
                <div className={styles.cardActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(servico)}
                  >
                    Editar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(servico.id)}
                  >
                    Apagar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Você ainda não cadastrou nenhum serviço.</p>
          )}
        </div>
      </div>

      {/* Modal para editar serviço */}
      {isEditModalOpen && editingService && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <h3>Editar Serviço</h3>
            <form onSubmit={handleUpdateService}>
              <label className={styles.label}>Nome do Serviço</label>
              <input
                type="text"
                value={editingService.name}
                onChange={(e) =>
                  setEditingService({ ...editingService, name: e.target.value })
                }
                required
              />
              <label className={styles.label}>Descrição</label>
              <textarea
                value={editingService.description}
                onChange={(e) =>
                  setEditingService({ ...editingService, description: e.target.value })
                }
                required
              />
              <label className={styles.label}>Duração (min)</label>
              <input
                type="number"
                value={editingService.duration}
                onChange={(e) =>
                  setEditingService({ ...editingService, duration: e.target.value })
                }
                required
              />
              <label className={styles.label}>Preço (R$)</label>
              <input
                type="number"
                step="0.01"
                value={editingService.price}
                onChange={(e) =>
                  setEditingService({ ...editingService, price: e.target.value })
                }
                required
              />
              <div className={styles.modalButtons}>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>
                  Cancelar
                </button>
                <button type="submit">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
