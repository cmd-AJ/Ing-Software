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
          <IonTitle>Woking</IonTitle>
          <IonButtons slot="end">
            <IonButton routerLink="/home">Registrarse</IonButton>
            <IonButton routerLink="/register">Iniciar Sesión</IonButton>
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
              <IonCardSubtitle>Encuentra a tu empleado perfecto</IonCardSubtitle>
              <IonCardTitle>Un sistema eficiente</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Diferente
              <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
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
