import { useState, useEffect } from "react";
import styles from "@/styles/serviceForm.module.css";
import api from "@/utils/api"; // 1. Importar nossa instância do Axios

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

  // A função buscarServicos não é mais necessária neste componente,
  // pois a lista de serviços é exibida por outro componente (ServiceList).
  // Vamos remover a chamada e o estado 'servicos'.

  useEffect(() => {
    async function buscarUsuario() {
      try {
        // 2. Usar api.get para buscar o usuário logado
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
      // Cria o FormData para enviar os dados, incluindo a imagem
      const form = new FormData();
      form.append("name", formData.name);
      form.append("description", formData.description);
      form.append("duration", formData.duration);
      form.append("price", formData.price);
      form.append("image", formData.image);

      // 3. Usa api.post para criar o serviço.
      // Axios configura o 'Content-Type' para 'multipart/form-data' automaticamente.
      await api.post("/api/services", form);

      // Limpa o formulário após o sucesso
      setFormData({
        name: "",
        description: "",
        duration: "",
        price: "",
        image: null,
      });
      e.target.reset(); // Garante que o input de arquivo seja limpo

      // Chama a função de sucesso, se ela foi passada como prop
      if (onSuccess) onSuccess();

    } catch (err) {
      console.error("Erro ao criar serviço:", err);
      // Adicionar um toast de erro aqui seria uma boa melhoria
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
