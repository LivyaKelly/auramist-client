import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import styles from "@/styles/carousel.module.css";

const onClickHandler = (e) => {
  console.log(e);
};

export default function Carrossel() {
  return (
    <div className={styles.containerCarrossel}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={true}
        infiniteLoop
        interval={5000}
        transitionTime={1000}
        swipeable
        emulateTouch
        autoPlay={true}
        centerMode={true}
        centerSlidePercentage={33}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              className={styles.setaEsquerda}
              onClick={onClickHandler}
              aria-label={label}
            >
              <IoIosArrowBack />
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext, label) =>
          hasNext && (
            <button
              className={styles.setaDireita}
              onClick={onClickHandler}
              aria-label={label}
            >
              <IoIosArrowForward />
            </button>
          )
        }
      >
        <div>
          <Image
            src="/img/fotos/carrossel-1.svg"
            alt="Encontre o melhor cabeleireiro para você"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
        <div>
          <Image
            src="/img/fotos/carrossel-2.svg"
            alt="Encontre os melhores produtos de beleza"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
        <div>
          <Image
            src="/img/fotos/carrossel-1.svg"
            alt="Descubra serviços incríveis perto de você"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
        <div>
          <Image
            src="/img/fotos/carrossel-2.svg"
            alt="Encontre os melhores produtos de beleza"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
        <div>
          <Image
            src="/img/fotos/carrossel-1.svg"
            alt="Descubra serviços incríveis perto de você"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
        <div>
          <Image
            src="/img/fotos/carrossel-2.svg"
            alt="Encontre os melhores produtos de beleza"
            width={150}
            height={150}
            className={styles.imagemBanner}
          />
        </div>
      </Carousel>
    </div>
  );
}
