import React from "react";
import styles from "./contrato.module.css"; // CSS module for page-specific styles
import TopBar from "./components/TopBar";
import LandingSearchBar from "./components/LadingSearchBar";

const Contrato: React.FC = () => {
  const buttons = [
    { label: "Iniciar sesion", onClick: () => {} },
    { label: "Iniciar sesion", onClick: () => {} },
  ];

  const tempFontColor = {
    color : 'black'
  }
  return (
    <div className={styles.contratoPage}>
      <TopBar buttons={buttons} />
      <div className={styles.content}>
        
        {/* Section 1 */}
        <section className={styles.section1}>
          
          <div className={styles.innerContainer}>
            <div className={styles.descriptionContainer}>
              <p style={tempFontColor}>Encuentra El experto que tus amigos ya confian</p>
              <p style={tempFontColor}>Conecta con profesionales de confianza recomenado por tu propia red</p>
              <p style={tempFontColor}>Quieres trabajar?</p>
              <LandingSearchBar onRequestChange={()=> {}} onSearch={() => {}}/>
            </div>

            <div className={styles.productIdea}>
              <p>Nodes</p>
            </div>
            
          </div>
        </section>

        {/* Section 2 */}
        <section className={styles.section2}>
          <div className={styles.aboutDisplayer}></div>
          <div className={styles.productAssets}></div>
        </section>
      </div>
    </div>
  );
};

export default Contrato;
