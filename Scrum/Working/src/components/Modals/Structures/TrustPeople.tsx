import React, { useEffect, useState } from "react"
import { getTrustedPeople } from "../../../controller/UserController"
import TrustPerson from "./TrustPerson"
import './TrustedStyle.css'
import TextND from "../../Txt/TextND"
import HorizontalDivider from "../../Dividers/HorizontalDivider"

interface ContainerProps { 
    dpi: string
}

type trustPerson = {
    nombre: string
    apellido: string
    rating: number
    telefono: string
    image: string
}

const TrustPeople: React.FC<ContainerProps> = ({ dpi }) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [people, setPeople] = useState<trustPerson[]>([])
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTrustedPeople(dpi)
                
                if (data && data.length > 0) {
                    setPeople(data)
                } else {
                    setError('Sin personas de confianza')
                    setPeople([])
                }
            } catch (error) {
                setError('Error al obtener las personas de confianza')
            }
        }
        fetchData()
    }, [dpi])
    

    return (
        <div className="trust-display">
            <TextND text="Personas de confianza" hex={tertiaryColor} size="big"/>
            <HorizontalDivider/>
            {error ? (
                <div style={{ minHeight: '280px', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                    <TextND text={error} size="medium" hex="#888" />
                </div>
            ) : (
                people.map(person => (
                    <TrustPerson nombre={person.nombre} apellido={person.apellido} rating={person.rating} tel={person.telefono} img={person.image} />
                ))
            )}
        </div>
    )
    
}

export default TrustPeople