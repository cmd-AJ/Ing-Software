import React from 'react';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonButtons, 
  IonButton, 
  IonSegment, 
  IonSegmentButton, 
  IonContent,
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent 
} from '@ionic/react';
import './About.css';

const About: React.FC = () => {
  // Function to handle click event and scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>SABTE</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/register">Registrarse</IonButton>
            <IonButton routerLink="/home">Iniciar Sesión</IonButton>
          </IonButtons>
        </IonToolbar>
        <IonSegment>
          <IonSegmentButton onClick={() => scrollToSection('about')}>About</IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection('customers')}>Customers</IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection('contact')}>Contact</IonSegmentButton>
          <IonSegmentButton onClick={() => scrollToSection('employees')}>Employees</IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent id="mainContent" scroll-y="true">
        {/* Sections */}
        <section id="about">
          {/* Add about section content here */}
          <IonCard>
            <IonCardHeader>
              <IonCardTitle class= "IonCardTitle">Acerda de Woking</IonCardTitle>
            </IonCardHeader>
            <IonCardContent id="aboutContent">
            <div className="contentWrapper">
              <div className="imageWrapper">
                <img src="/src/assets/employee-and-customer-experience.jpg" alt="Descripción de la imagen" />
              </div>
              <div className="textWrapper">
              En el núcleo de nuestra visión se encuentra una aplicación revolucionaria diseñada 
              para unir empleados con empleadores en sectores altamente especializados, prometiendo
               una era de vanguardia y eficiencia sin precedentes. Nuestra plataforma, concebida con 
               la más avanzada tecnología, se especializa en descifrar la complejidad de las 
               necesidades laborales específicas, facilitando conexiones perfectas entre talentos 
               únicos y oportunidades excepcionales. Al priorizar la precisión en el emparejamiento y 
               la agilidad en los procesos, nos esforzamos por superar las expectativas tradicionales 
               del mercado laboral. Cada función de nuestra solucion está diseñada para impulsar la innovación, 
               ofreciendo a empleados y empleadores herramientas intuitivas que permiten una interacción 
               fluida y efectiva. Este enfoque asegura no solo el cumplimiento de los requisitos laborales 
               sino también la promoción del crecimiento mutuo y la satisfacción.
              </div>
            </div>
            </IonCardContent>
          </IonCard>
        </section>

        <section id="customers">
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Tu eres la prioridad</IonCardSubtitle>
              <IonCardTitle>El cliente siempre tiene la razon</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Nuestros cliente tienen fiabilidad
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

            </IonCardContent>
          </IonCard>
        </section>

        <section id="employees">
          {/* Add employees section content here */}
          <IonCard>
            <IonCardHeader>
              <IonCardSubtitle>Diversidad unica</IonCardSubtitle>
              <IonCardTitle>Multiples empleados para multiples clientes</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Solo buscas y lo encontramos por ti
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

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
            <br/><br/><br/><br/><br/><br/>
            </IonCardContent>
          </IonCard>
        </section>

        
      </IonContent>

    </>
  );
};

export default About;
