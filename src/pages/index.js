import Image from "next/image";
import styles from "@/styles/index.module.css";
import Sobre from "@/components/about";
import Rodape from "@/components/footer";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const goToLoginCli = () => {
    router.push("/login");
  };

  return (
    <>
      <div className={styles.logo}>
        <Image
          src="/img/logos/AURAMIST-Logo.svg"
          alt="Auramist Logo"
          width={400}
          height={200}
        />
      </div>
      <div className={styles.mulher}>
        <Image
          className={styles.mulherMeditando}
          src="/img/icons/Mulher_meditando.svg"
          alt="Mulher meditando"
          width={400}
          height={200}
        />
        <Image
          className={styles.elemento}
          src="/img/icons/Elemento-azul.svg"
          alt="Elemento azul"
          width={400}
          height={200}
        />
      </div>
      <div>
        <h1 className={styles.boasVindas}>Bem-vindo ao Auramist!</h1>
      </div>
      <div>
        <h3 className={styles.aviso}>
          Siga os passos para agendar seu próximo serviço de beleza
        </h3>
      </div>
      <div className={styles.botoes}>
        <button onClick={goToLoginCli} className={styles.botaoC}>
          Entrar
        </button>
      </div>

      {/* <Sobre /> */}
      {/* <Rodape /> */}
    </>
  );
}
