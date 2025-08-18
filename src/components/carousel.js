import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Image from "next/image";
import styles from "@/styles/carousel.module.css";

export default function Carrossel() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth || 0);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isTablet = width >= 768 && width <= 1023;
  const isMobile = width > 0 && width <= 767;
  const isDesktop = width >= 1024;

  const centerMode = isDesktop;                 
  const centerSlidePercentage = isDesktop ? 33 : 100; 
  const showStatus = isDesktop;                 

  return (
    <div className={styles.containerCarrossel}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={showStatus}
        infiniteLoop
        interval={5000}
        transitionTime={600}
        swipeable
        emulateTouch
        autoPlay={true}
        centerMode={centerMode}
        centerSlidePercentage={centerSlidePercentage}
        renderArrowPrev={(onClickHandler, hasPrev, label) =>
          hasPrev && (
            <button
              className={styles.setaEsquerda}
              onClick={onClickHandler}
              aria-label={label}
              type="button"
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
              type="button"
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
