import React, { useEffect, useState } from "react"
import { getTrustedPeople } from "../../controller/UserController"
import TrustPerson from "./trustPerson"

interface ContainerProps {  }

const TrustPeople: React.FC<ContainerProps> = () => {

    const [people, setPeople] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrustedPeople('7234 51119 0101')
            setPeople(data)
        }

        fetchData()
    },[])

    return (
        <div className="trustSec">
            {
                people.map(person => (
                    <TrustPerson nombre={person.nombre} apellido={person.apellido} rating={person.rating} tel={person.telefono} img={person.image}/>
                ))
            }
        </div>
    )
}

export default TrustPeople