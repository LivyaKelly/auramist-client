import Image from "next/image";
import styles from "@/styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.filtro}></div>
      <div className={styles.informacoes}>
        <div className={styles.conteudo}>
          <div className={styles.esquerda}>
            <Image
              src="/img/logos/AURAMIST-Logo-Branca - Vetorizada.svg"
              alt="Logo do Auramist"
              width={400}
              height={200}
              className={styles.logoFooter}
            />
            <p className={styles.descricao}>
              Com o Auramist, agendar serviços de beleza ficou mais simples e
              prático. Conectamos você diretamente aos melhores profissionais,
              valorizando seu tempo, sua confiança e a sua beleza.
            </p>
          </div>

          <div className={styles.meio}>
            <div className={styles.servicos}>
              <h4>Serviços</h4>
              <ul>
                <li>Cabelos</li>
                <li>Manicure</li>
                <li>Maquiagem</li>
                <li>Barbearia</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            © 2025 Auramist - Todos os direitos reservados. Powered by Auramist.
          </p>
        </div>
      </div>
    </footer>
  );
}
