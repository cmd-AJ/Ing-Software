import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import InfoCard from "../components/About/Explain";
import "./About.css";

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
          <IonTitle>SABTE</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/register">
              Registrarse
            </IonButton>
            <IonButton routerLink="/home">
              Iniciar Sesión
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSegment>
          <IonSegmentButton onClick={() => scrollToSection("about")}>
            About
          </IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection("customers")}>
            Customers
          </IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection("contact")}>
            Contact
          </IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection("employees")}>
            Employees
          </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent id="mainContent" scroll-y="true">
        {/* Sections */}
        <section id="about">
          <section className="background-image">
            <IonCardContent id="aboutContent">
              <h1 className="apptitle">Acerca de SABTE</h1>
            </IonCardContent>
          </section>
          <section id="nextSection">
                <h1 className="emptyTitle">
                  Sistema Accesible<br/>de busqueda de trabajos especificos
                </h1>
          </section>
            <InfoCard
              title="Misión"
              content="En el corazón de nuestra misión en SABTE se encuentra el compromiso de transformar y optimizar la manera en que los profesionales especializados y los empleadores se conectan en el mercado laboral. Nuestra visión es desarrollar una plataforma digital innovadora que no solo facilite un encuentro eficiente entre la oferta y demanda de servicios especializados, sino que también promueva un entorno de confianza y transparencia. Aspiramos a eliminar las barreras que actualmente dificultan la contratación de talentos especializados, ofreciendo una solución accesible e integral que responda a las necesidades de ambos sectores.

              "
              imageUrl="https://procesa.es/wp-content/uploads/2019/12/bsqueda-empleo.jpg"
            />
            <InfoCard
              title="Visión"

              content="Nuestra visión se extiende a construir una comunidad en donde cada miembro, sin importar el nivel de habilidades tecnológicas, pueda encontrar oportunidades de crecimiento y desarrollo profesional. Estamos dedicados a hacer que cada interacción en nuestra plataforma no solo sea posible, sino excepcional, asegurando que cada profesional pueda demostrar su valía y cada empleador pueda hallar el talento ideal. En SABTE, creemos en el poder de unir a las personas a través de la tecnología para crear un futuro más inclusivo y próspero para todos los profesionales especializados.
              "
              imageUrl="https://c8.alamy.com/compes/2cb921p/adicta-a-la-tecnologia-joven-carrera-mixta-femenino-hombre-personas-utilizar-smartphones-chat-en-redes-sociales-comunicarse-en-linea-tipo-enviar-mensajes-de-correo-electronico-concepto-de-vida-virtual-dibujos-animados-vector-ilustracion-2cb921p.jpg"
            />
          <section>
            
          </section>
        </section>

        <section id="customers">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Tu eres la prioridad</IonCardSubtitle>
              <IonCardTitle>El cliente siempre tiene la razon</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Nuestros cliente tienen fiabilidad
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </IonCardContent>
          </IonCard>
        </section>

        <section id="employees">
          {/* Add employees section content here */}
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Diversidad unica</IonCardSubtitle>
              <IonCardTitle>
                Multiples empleados para multiples clientes
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Solo buscas y lo encontramos por ti
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </IonCardContent>
          </IonCard>
        </section>

        <section id="contact">
          {/* Add contact section content here */}
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Dudas</IonCardSubtitle>
              <IonCardTitle>Contacto</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
            </IonCardContent>
          </IonCard>
        </section>
      </IonContent>
    </>
  );
};

export default About;
