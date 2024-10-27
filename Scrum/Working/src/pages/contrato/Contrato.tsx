import React from "react";
import styles from "./contrato.module.css"; // CSS module for page-specific styles
import TopBar from "./components/TopBar";
import LandingSearchBar from "./components/LadingSearchBar";
import GraphContainer from "./components/GraphContainer";

const Contrato: React.FC = () => {
  const buttons = [
    { label: "Iniciar sesion", onClick: () => {} },
    { label: "Iniciar sesion", onClick: () => {} },
  ];

  const text = "Quieres trabajar? ->";
  return (
    <div className={styles.contratoPage}>
      <TopBar buttons={buttons} />
      <div className={styles.content}>
        {/* Section 1 */}
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
              <LandingSearchBar
                onRequestChange={() => {}}
                onSearch={() => {}}
              />
            </div>

            <div className={styles.productIdea}>
              <GraphContainer />
            </div>
          </div>
        </section>

        {/* <section className={styles.section2}>
          <div className={styles.aboutDisplayer}></div>
          <div className={styles.productAssets}></div>
        </section> */}
      </div>
    </div>
  );
};

export default Contrato;
