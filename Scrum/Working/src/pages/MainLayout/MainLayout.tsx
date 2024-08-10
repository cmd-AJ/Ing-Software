import { IonContent } from '@ionic/react';
import NavigationBar from '../../components/Navigation/Navigation';
import { useState } from 'react';


interface MainLayoutProps {
    children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children}) => {
    const [request, setRequest] = useState('');
    

    return (
      <>
        <NavigationBar setRequest={setRequest} /> {/* Pass setRequest prop */}
        <IonContent>
          {children}
        </IonContent>
      </>
    );
  };
  

export default MainLayout;