import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonCardContent,
} from "@ionic/react";
import InfoCard from "../components/About/Explain";
import "./About.css";
import "../theme/variables.css"
import Carousel from "../components/About/Carousel";
import EmployeeCarousel from "../components/About/EmployeeCarousel";

const About: React.FC = () => {
  // Function to handle click event and scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonHeader className="titleheader">CONTRATOGT</IonHeader>
          <IonButtons slot="end">
            <IonButton routerLink="/register" className="colorheader">
              Registrarse
            </IonButton>
            <IonButton routerLink="/home" className="colorheader">
              Iniciar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSegment>
          <IonSegmentButton className="scrollbut" onClick={() => scrollToSection("about")}>
            Acerca de
          </IonSegmentButton>
          <IonSegmentButton className="scrollbut" onClick={() => scrollToSection("customers")}>
            Clientes
          </IonSegmentButton>
          <IonSegmentButton className="scrollbut" onClick={() => scrollToSection("employees")}>
            Empleados
          </IonSegmentButton>
          <IonSegmentButton className="scrollbut" onClick={() => scrollToSection("contact")}>
            Contacto
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent id="mainContent" scroll-y="true">
        {/* Sections */}
        <section id="about">
          <section className="background-image">
            <IonCardContent id="aboutContent">
              <h1 className="apptitle">Acerca de Contratogt</h1>
            </IonCardContent>
          </section>
          <section id="nextSection">
            <h1 className="emptyTitle">
              Sistema Accesible
              <br />
              de busqueda de trabajos especificos
            </h1>
          </section>
          <InfoCard
            title="Misión"
            content="En el corazón de nuestra misión en Contratogt se encuentra el compromiso de transformar y optimizar la manera en que los profesionales especializados y los empleadores se conectan en el mercado laboral. Nuestra visión es desarrollar una plataforma digital innovadora que no solo facilite un encuentro eficiente entre la oferta y demanda de servicios especializados, sino que también promueva un entorno de confianza y transparencia. Aspiramos a eliminar las barreras que actualmente dificultan la contratación de talentos especializados, ofreciendo una solución accesible e integral que responda a las necesidades de ambos sectores.

              "
            imageUrl="https://procesa.es/wp-content/uploads/2019/12/bsqueda-empleo.jpg"
          />
          <InfoCard
            title="Visión"
            content="Nuestra visión se extiende a construir una comunidad en donde cada miembro, sin importar el nivel de habilidades tecnológicas, pueda encontrar oportunidades de crecimiento y desarrollo profesional. Estamos dedicados a hacer que cada interacción en nuestra plataforma no solo sea posible, sino excepcional, asegurando que cada profesional pueda demostrar su valía y cada empleador pueda hallar el talento ideal. En Contratogt, creemos en el poder de unir a las personas a través de la tecnología para crear un futuro más inclusivo y próspero para todos los profesionales especializados.
              "
            imageUrl="https://c8.alamy.com/compes/2cb921p/adicta-a-la-tecnologia-joven-carrera-mixta-femenino-hombre-personas-utilizar-smartphones-chat-en-redes-sociales-comunicarse-en-linea-tipo-enviar-mensajes-de-correo-electronico-concepto-de-vida-virtual-dibujos-animados-vector-ilustracion-2cb921p.jpg"
          />
          <section></section>
        </section>

        <section id="customers">
          <section id="nextSection">
            <h1 className="emptyTitle-cx">
              Clientes
              <br />
            </h1>
          </section>
          <Carousel />
        </section>

        <section id="employees">
          <section id="nextSection">
            <h1 className="emptyTitle-cx">
              Empleados
              <br />
            </h1>
            <section className="description-section">
              <p>
                Genera tu red de contactos, gana y haz crecer tu red de
                confianza, creando oportunidades para todos.
              </p>
            </section>
          </section>
          <EmployeeCarousel />
        </section>

        <section id="contact">
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="icon ion-logo-facebook"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="icon ion-logo-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="icon ion-logo-instagram"></i>
            </a>
          </div>
          <a href="mailto:contact@example.com" className="email-link">
            mar22397@uvg.edu.gt
          </a>
          <a href="#" className="terms-link">
            Términos de uso
          </a>
          <p className="rights">© 2024 All Rights Reserved</p>
        </section>
      </IonContent>
    </>
  );
};

export default About;
