import React, { useEffect, useState } from "react"
import { getTrustedPeople } from "../../../controller/UserController"
import TrustPerson from "./TrustPerson"
import './TrustedStyle.css'
import TextND from "../../Txt/TextND"
import HorizontalDivider from "../../Dividers/HorizontalDivider"

interface ContainerProps { 
    dpi: string
}

const TrustPeople: React.FC<ContainerProps> = ({ dpi }) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [people, setPeople] = useState<any[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrustedPeople(dpi)
            if (data && data.length > 0){
                setPeople(data)
            } else {
                setError('Sin personas de confianza')
                setPeople([])
            }
        }

        fetchData()
    },[dpi])

    if (error !== '') {
        return (
            <div className="trust-display">
                
                <>
                    <TextND text="Personas de confianza" hex={tertiaryColor} size="big"/>
                    <HorizontalDivider/>
                </>
                
                <div style={{minHeight: '280px', width:'100%', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
                    <TextND text={error} size="medium" hex="#888"/>
                </div>

            </div>
        )
    }

    return (
        <>
            <div className="trust-display">
                
                <>
                    <TextND text="Personas de confianza" hex={tertiaryColor} size="big"/>
                    <HorizontalDivider/>
                </>
                
                {
                    people.map(person => (
                        <TrustPerson nombre={person.nombre} apellido={person.apellido} rating={person.rating} tel={person.telefono} img={person.image}/>
                    ))
                }
            </div>
        </>
    )
}

export default TrustPeople