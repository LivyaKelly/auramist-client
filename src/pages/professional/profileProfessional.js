import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import ProfessionalSidebar from "@/components/professionalSidebar";
import CustomerSideBar from "@/components/customerSidebar";
import api from "@/utils/api";
import styles from "@/styles/profile.module.css";
import { Edit, Mail, Phone, User, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Ref para o input de ficheiro escondido
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/api/users/protected");
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    router.push("/");
  };

  const handleEditClick = () => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await api.put('/api/users/protected', {
        name: editingUser.name,
        phone: editingUser.phone,
        email: editingUser.email,
      });
      const updatedUser = response.data.user || response.data;
      setUser(updatedUser);
      setIsEditModalOpen(false);
      toast.success("Perfil atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      const message = error.response?.data?.message || "Não foi possível atualizar o perfil.";
      toast.error(message);
    }
  };

  // Função para lidar com a troca da foto de perfil
  const handlePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await api.put('/api/users/picture', formData);
      setUser(response.data.user); // Atualiza o utilizador com a nova URL da foto
      toast.success("Foto de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao atualizar a foto:", error);
      toast.error("Não foi possível atualizar a foto.");
    }
  };

  if (loading || !user) {
    return <p className={styles.loadingText}>A carregar perfil...</p>;
  }

  const Sidebar = user.role === 'PROFESSIONAL' ? ProfessionalSidebar : CustomerSideBar;

  return (
    <>
      <div className={styles.pageContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarContainer}>
              <img
                src={user.profilePictureUrl || "/img/fotos/unsplash_plsF6obTgms.png"}
                alt="Foto de Perfil"
                width={128}
                height={128}
                className={styles.avatar}
              />
              {/* Input de ficheiro escondido */}
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handlePictureChange}
              />
              {/* Botão que ativa o input de ficheiro */}
              <button className={styles.editAvatarButton} onClick={() => fileInputRef.current.click()}>
                <Edit size={16} />
              </button>
            </div>
            <div className={styles.infoContainer}>
              <h1 className={styles.userName}>{user.name}</h1>
              <span className={styles.userRole}>{user.role === 'CLIENT' ? 'Cliente' : 'Profissional'}</span>
            </div>
          </div>

          <div className={styles.detailsCard}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Informações de Contato</h2>
              <button className={styles.editProfileButton} onClick={handleEditClick}>
                <Edit size={16} />
                <span>Editar Perfil</span>
              </button>
            </div>
            <ul className={styles.contactList}>
              <li>
                <User size={20} className={styles.icon} />
                <div>
                  <span className={styles.label}>Nome Completo</span>
                  <p className={styles.value}>{user.name}</p>
                </div>
              </li>
              <li>
                <Mail size={20} className={styles.icon} />
                <div>
                  <span className={styles.label}>Email</span>
                  <p className={styles.value}>{user.email}</p>
                </div>
              </li>
              <li>
                <Phone size={20} className={styles.icon} />
                <div>
                  <span className={styles.label}>Telefone</span>
                  <p className={styles.value}>{user.phone || "Não informado"}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className={styles.actionsCard}>
             <button onClick={handleLogout} className={styles.logoutButton}>
                <LogOut size={16} />
                <span>Sair da Conta</span>
             </button>
          </div>
        </main>
      </div>

      {/* Modal de Edição de Perfil */}
      {isEditModalOpen && editingUser && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Perfil</h3>
            <form onSubmit={handleUpdateProfile}>
              <label className={styles.label}>Nome Completo</label>
              <input
                type="text"
                value={editingUser.name}
                onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                required
              />
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={editingUser.email}
                onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                required
              />
              <label className={styles.label}>Telefone</label>
              <input
                type="text"
                value={editingUser.phone || ''}
                onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
              />
              <div className={styles.modalButtons}>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancelar</button>
                <button type="submit">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
