import React from "react";
import styles from "./contrato.module.css"; // CSS module for page-specific styles
import TopBar from "./components/TopBar";

const Contrato: React.FC = () => {
  const buttons = [
    { label: "Iniciar sesion", onClick: () => {} },
    { label: "Iniciar sesion", onClick: () => {} },
  ];

  return (
    <div className={styles.contratoPage}>
      <TopBar buttons={buttons} />
      <div className={styles.content}>

        <section className={styles.section1}>
          <h1>phase 1</h1>
          <div className={styles.descriptionContainer}></div>
          <div className={styles.productIdea}></div>
        </section>

        <section className={styles.section2}>
          <h1>phase 2</h1>
          <div className={styles.aboutDisplayer}></div>
          <div className={styles.productAssets}></div>
        </section>
      </div>
    </div>
  );
};

export default Contrato;
