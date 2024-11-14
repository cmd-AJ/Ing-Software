import React, { useState } from "react";
import styles from "./contrato.module.css"; // CSS module for page-specific styles
import TopBar from "./components/TopBar";
import LandingSearchBar from "./components/LadingSearchBar";
import GraphContainer from "./components/GraphContainer";
import { Card } from "@mui/material";

interface Card {
  title: string;
  content: string;
  imageUrl: string; // URL of the image to display on hover
}

const Contrato: React.FC = () => {
  const [hoveredImage, setHoveredImage] = useState<string | null>(
    "https://img.freepik.com/foto-gratis/primer-plano-carpintero-masculino-que-mide-tablon-madera-largo-regla_23-2147945070.jpg?t=st=1730428246~exp=1730431846~hmac=6d2c22cbe30a912f8f2249e2be04384b934c76eccfd289a52c692c9b58440861&w=1380"
  );
  const [imageLoaded] = useState<boolean>(false);
  const [section, setSection] = useState("work");
  const buttons = [
    { label: "Iniciar sesion", onClick: () => {} },
    { label: "Iniciar sesion", onClick: () => {} },
  ];

  const goWantToWork = () => {
    setSection("work");
  };

  const goWantToHire = () => {
    setSection("hire");
  };

  const cardsData: Card[] = [
    {
      title: "¿Qué Es?",
      content:
        "Una red de contactos es un grupo de personas conectadas entre sí, con quienes puedes hablar acerca trabajadores  para garantizar servicios de calidad.",
      imageUrl:
        "https://img.freepik.com/foto-gratis/mujer-trabajando-taller_23-2148836020.jpg?t=st=1730428286~exp=1730431886~hmac=7aeea776419d683454190fce9ed1bc60c1dbbf3c2d41af3bf7f091fe05875b1b&w=2000", // Replace with actual image URLs
    },
    {
      title: "¿Cómo Funciona?",
      content:
        "Los usuarios agregan a su red profesionales con los que ya han trabajado. Así, la confianza fluye entre amigos, garantizando la calidad del oficio.",
      imageUrl:
        "https://img.freepik.com/foto-gratis/sonriente-joven-guapo-chico-limpieza-camiseta-guantes-que-muestran-gesto-llamada-telefonica-aislado-pared-verde_141793-103385.jpg?t=st=1730428372~exp=1730431972~hmac=29077ee323145844419f1a3b524dbc1bf4cea0bb967136c92fbc15f752b52f44&w=1800", // Replace with actual image URLs
    },
    {
      title: "Construye tu Red",
      content:
        "A  medida que recomiendas y contratas, tu red crece. Cuantos más amigos confíen en un profesional, más oportunidades tendrás de contratar con seguridad.",
      imageUrl:
        "https://img.freepik.com/foto-gratis/joven-camiseta-naranja-guantes-goma-gesticulando-mano-haciendo-gesto-dinero-mirando-camara-sonrisa-segura-pie-sobre-fondo-amarillo_141793-23946.jpg?t=st=1730428413~exp=1730432013~hmac=209ebe25fc56be2ae12bc615e0e63e382a5d41690533aee293d67f0974401f81&w=1800", // Replace with actual image URLs
    },
    {
      title: "A un solo click",
      content:
        "Puedes agregar a una persona a tu red de confianza desde su perfil, presionando el boton de “Agregar persona” y listo. Tan fácil como dar un click",
      imageUrl:
        "https://img.freepik.com/foto-gratis/empleado-repartidor-uniforme-camiseta-blanco-gorra-roja-mirando-camara-sonriendo-feliz-positivamente-mostrando-pulgares-arriba-pie-sobre-fondo-azul_141793-140378.jpg?t=st=1730428435~exp=1730432035~hmac=d00b5e89037947d16650c32ca40bee59214ff1bb16b94095deac0aad91a3c619&w=1800",
    },
  ];

  const text = "Quieres trabajar? ->";
  return (
    <div className={styles.contratoPage}>
      <TopBar goWantToHire={goWantToHire} goWantToWork={goWantToWork}/>
      <div className={styles.content}>

        {section == "work" 
        ?

         <section>
          <section className={styles.section1}>
          <div className={styles.innerContainer}>
            <div className={styles.descriptionContainer}>
              <p className={styles.mainSlogan}>
                Encuentra El experto Que tus amigos ya Confian.
              </p>
              <p className={styles.conectaCon}>
                Conectate Con Profesionales De Confianza Recomendados Por Tu
                Propia Red.
              </p>

              <p className={styles.quieres}>{text}</p>
            </div>

            <div className={styles.productIdea}>
              <GraphContainer />
            </div>
          </div>
        </section>
        <section className={styles.section2}>
          <div className={styles.innerContainer}>
            <div className={styles.aboutDisplayer}>
              <h2 className={styles.sec2Tittles}>Construye Tu Propia</h2>
              <h1 className={styles.sec2Tittles}>RED</h1>
              <h1 className={styles.sec2Tittles}>DE</h1>
              <h1 className={styles.sec2Tittles}>CONFIANZA</h1>
              <div className={styles.cardsContainer}>
                {cardsData.map((card, index) => (
                  <div
                    key={index}
                    className={styles.landAssetCard}
                    onMouseEnter={() => setHoveredImage(card.imageUrl)}
                    onMouseLeave={() =>
                      setHoveredImage(
                        "https://img.freepik.com/foto-gratis/primer-plano-carpintero-masculino-que-mide-tablon-madera-largo-regla_23-2147945070.jpg?t=st=1730428246~exp=1730431846~hmac=6d2c22cbe30a912f8f2249e2be04384b934c76eccfd289a52c692c9b58440861&w=1380"
                      )
                    }
                  >
                    <h1>{card.title}</h1>
                    <p>{card.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.productAssets}>
              {hoveredImage && (
                <img
                  src={hoveredImage}
                  alt="Product Asset"
                  className={`${styles.landHoveredImage} ${
                    imageLoaded ? styles.visible : ""
                  }`}
                />
              )}
            </div>
          </div>
        </section>
         </section> 
         : 

         <section>hire</section>}

        
      </div>
    </div>
  );
};

export default Contrato;
