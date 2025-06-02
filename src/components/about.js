import Image from "next/image";
import styles from "@/styles/about.module.css";

export default function About() {
  return (
    <section className={styles.sobre}>
      <div className={styles.textos}>
        <h1 className={styles.titulo}>
          Sobre o<br /> <span>Auramist</span>
        </h1>
        <Image
          src="/img/backgrounds/moldura.svg"
          alt="Moldura decorativa"
          width={45}
          height={45}
          className={styles.moldura}
        />
        <p className={styles.descricao}>
          Nosso objetivo é tornar o processo de agendamento mais simples e
          prático, eliminando a necessidade de ligações ou trocas demoradas de
          mensagens. O Auramist foi criado para atender todas as pessoas que
          procuram serviços de beleza e estética, como cortes de cabelo,
          barbearia, manicure, pedicure, maquiagem e entre outros. A plataforma
          facilita a escolha de profissionais, garantindo comodidade, eficiência
          e personalização para os clientes, além de oferecer uma experiência
          acessível e confiável.
        </p>
        <Image
          src="/img/backgrounds/moldura2.svg"
          alt="Moldura decorativa"
          width={45}
          height={45}
          className={styles.moldura2}
        />
      </div>
      <div className={styles.imagemComTexto}>
        <Image
          src="/img/backgrounds/moldura.svg"
          alt="Moldura decorativa"
          width={45}
          height={45}
          className={styles.moldura3}
        />
        <p className={styles.textoSobreImagem}>
          Além disso, o Auramist ajuda salões de beleza e profissionais
          autônomos a organizarem seus horários, evitando conflitos e confusões
          de agenda. Com uma interface fácil de usar e funcionalidades modernas,
          conecta clientes e prestadores de serviços, valorizando o cuidado, a
          confiança e a qualidade em cada atendimento.
        </p>
        <Image
          src="/img/backgrounds/moldura2.svg"
          alt="Moldura decorativa"
          width={45}
          height={45}
          className={styles.moldura4}
        />
        <Image
          src="/img/fotos/sobre-foto.svg"
          alt="Foto de salão de beleza"
          width={500}
          height={350}
          className={styles.imagem}
        />
      </div>
    </section>
  );
}
