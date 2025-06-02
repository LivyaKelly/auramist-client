import React, { useEffect, useState } from "react";
import Sidebar from "@/components/customerSidebar";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineEdit, AiOutlineMessage } from "react-icons/ai";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import styles from "@/styles/profile.module.css";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/protected", {
          credentials: "include",
        });
        if (!res.ok) return router.push("/login");

        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  if (loading || !user)
    return <p style={{ padding: "2rem" }}>Carregando perfil...</p>;

  return (
    <>
      <Sidebar />
      <div className={styles.profileContainer}>
        <div className={styles.headerSection}>
          <div className={styles.profileImageWrapper}>
            <Image
              src="/img/fotos/unsplash_plsF6obTgms.png"
              alt="Profile"
              width={150}
              height={150}
              className={styles.profileImage}
            />
            <button className={styles.editButton}>
              <AiOutlineEdit className={styles.editIcon} />
            </button>
          </div>

          <div className={styles.infoSection}>
            <h1 className={styles.profileName}>{user.name}</h1>
            <div className={styles.ratingsMessage}>
              <button className={styles.messageButton}>
                <AiOutlineMessage className={styles.messageIcon} /> Mensagem
              </button>
            </div>
          </div>
        </div>

        <div className={styles.tabNavigation}>
          <nav className={styles.tabs}>
            <a href="#about" className={`${styles.tabLink} ${styles.active}`}>
              <Image
                src="/img/icons/3171065 1.svg"
                alt="About Icon"
                width={23}
                height={20}
                className={styles.tabIcon}
              />{" "}
              About
            </a>
          </nav>
        </div>

        <div id="about" className={styles.contactInfo}>
          <h3 className={styles.contactTitle}>Informação de Contato</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem1}>
              <FaPhoneAlt className={styles.contactIcon} />
              {user.phone || "Telefone não informado"}
            </li>
            <li className={styles.contactItem3}>
              <FaEnvelope className={styles.contactIcon} />
              {user.email}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
