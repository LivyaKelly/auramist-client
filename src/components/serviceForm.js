import { useState, useEffect } from "react";
import styles from "@/styles/serviceForm.module.css";
import api from "@/utils/api"; 

export default function ServiceForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    image: null,
  });

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function buscarUsuario() {
      try {
        const response = await api.get("/api/auth/me");
        setUsuarioLogado(response.data);
      } catch (err) {
        console.error("Erro ao buscar usuário logado:", err);
      }
    }
    buscarUsuario();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("duration", formData.duration);
      form.append("price", formData.price);
      form.append("image", formData.image);

      await api.post("/api/services", form);

      setFormData({
        name: "",
        description: "",
        duration: "",
        price: "",
        image: null,
      });
      e.target.reset(); 

      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("Erro ao criar serviço:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h2>Cadastrar Novo Serviço</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <input
          className={styles.input}
          type="text"
          placeholder="Nome do serviço"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          className={styles.input}
          placeholder="Descrição"
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Duração (min)"
          required
          value={formData.duration}
          onChange={(e) =>
            setFormData({ ...formData, duration: e.target.value })
          }
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Preço (R$)"
          required
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          className={styles.input}
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        {usuarioLogado?.name && (
          <p className={styles.professionalText}>
            Profissional: <strong>{usuarioLogado.name}</strong>
          </p>
        )}

        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Enviando..." : "Cadastrar Serviço"}
        </button>
      </form>
      <hr className={styles.hr} />
    </div>
  );
}
