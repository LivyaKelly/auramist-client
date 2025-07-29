import { useState, useEffect } from "react";
import styles from "@/styles/serviceForm.module.css";

export default function ServiceForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    duration: "",
    price: "",
    image: null,
  });

  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    buscarUsuario();
    buscarServicos();
  }, []);

  async function buscarUsuario() {
    try {
      const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Falha ao obter usuário");

      const data = await res.json();
      setUsuarioLogado(data);
    } catch (err) {
      console.error("Erro ao buscar usuário logado:", err);
    }
  }

  async function buscarServicos() {
    try {
      const res = await fetch(`${API_URL}/api/services/my`, {
        credentials: "include",
      });
      const data = await res.json();
      setServicos(data);
    } catch (err) {
      console.error("Erro ao buscar serviços:", err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (!usuarioLogado?.id || !usuarioLogado?.name) {
        throw new Error("Usuário não autenticado corretamente.");
      }

      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("duration", formData.duration);
      form.append("price", formData.price);
      form.append("image", formData.image);
      form.append("professionalId", usuarioLogado.id);
      form.append("professionalName", usuarioLogado.name);

      const res = await fetch(`${API_URL}/api/services`, {
        method: "POST",
        body: form,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Erro ao criar serviço");

      setFormData({
        name: "",
        description: "",
        duration: "",
        price: "",
        image: null,
      });

      buscarServicos();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
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
        encType="multipart/form-data"
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
