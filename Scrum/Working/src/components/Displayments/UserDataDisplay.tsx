import TrustPeople from "./TrustPeople";
import VerticalDivider from "../Dividers/VerticalDivider";
import ContratsDisplay from "./ContratsDisplay";
import JobsDisplay from "./JobsDisplay";
import { useState, useEffect } from "react";
import { IonSegment, IonSegmentButton } from "@ionic/react";

interface ContainerProps {
    dpi: string
    role: string
    setDetails : (showDetails : boolean) => void
}

const UserDataDisplay: React.FC<ContainerProps> = ({dpi, role, setDetails}) => {

    const [width, setWidth] = useState(window.innerWidth)
    const [selectedSegment, setSelectedSegment] = useState('leftSegment')

    const handleLeftSegment = () => {
        setSelectedSegment('leftSegment')
    }

    const handleRightSegment = () => {
        setSelectedSegment('rightSegment')
    }

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }        

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    if (width > 660) {
        if (role === 'Empleador'){
            return (
                <div style={{display: 'flex', height: '100%', minHeight: '378px', width: '100%'}}>
                    <TrustPeople dpi={dpi} selectedValue=""/>
                    <VerticalDivider/>
                    <ContratsDisplay dpi={dpi} selectedValue="" role={role} setDetails={setDetails}/>
                </div>
            )
        } else {
            return (
                <div style={{display: 'flex', height: '100%', minHeight: '378px'}}>
                    <ContratsDisplay dpi={dpi} selectedValue="" role={role} setDetails={setDetails}/>
                    <VerticalDivider />
                    <JobsDisplay dpi={dpi} selectedValue=""/>
                </div>
            )
        }
    } else {
        if (role === 'Empleador') {
            return (
                <>
                    <IonSegment value={selectedSegment}>
                        <IonSegmentButton value="leftsegment" onClick={handleLeftSegment}>
                            Personas
                        </IonSegmentButton>
                        <IonSegmentButton value="rightsegment" onClick={handleRightSegment}>
                            Contratos
                        </IonSegmentButton>
                    </IonSegment>
                    {
                        selectedSegment === 'leftSegment' &&
                        <TrustPeople dpi={dpi} selectedValue={selectedSegment}/>
                    }
                </>
            )
        } else {
            return (
                <>
                    <IonSegment value={selectedSegment}>    
                        <IonSegmentButton value="leftSegment" onClick={handleLeftSegment}>
                            Contratos
                        </IonSegmentButton>
                        <IonSegmentButton value="rightSegment" onClick={handleRightSegment}>
                            Trabajos
                        </IonSegmentButton>
                    </IonSegment>
                    {
                        selectedSegment === 'leftSegment' &&
                        <ContratsDisplay dpi={dpi} selectedValue={selectedSegment} role={role} setDetails={setDetails}/>
                    }
                    {
                        selectedSegment === 'rightSegment' &&
                        <JobsDisplay dpi={dpi} selectedValue={selectedSegment}/>
                    }
                </>
            )
        }
    }

}

export default UserDataDisplay;
