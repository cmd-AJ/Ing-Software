import { IonPage, IonTitle } from "@ionic/react"
import Header from "../components/Dashboard-Worker/Header";
import Info from '../components/Dashboard-Worker/Info'
import './Dashboard-Worker.css'
import Placeholder from "../components/Dashboard-Worker/PlaceHolder";

const Dashboard_Worker: React.FC = () => {
    return (
      <IonPage >
        <div className="content">
            <Placeholder />
            <Header />
            <Info />
        </div>
      </IonPage>
    );
  };
  

export default Dashboard_Worker