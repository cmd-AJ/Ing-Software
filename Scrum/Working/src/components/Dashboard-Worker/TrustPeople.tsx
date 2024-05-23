import React, { useEffect, useState } from "react"
import { getTrustedPeople } from "../../controller/UserController"

interface COntainerProps {  }

const TrustPeople: React.FC<COntainerProps> = () => {

    const [people, setPeople] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const data = await getTrustedPeople('7234 51119 0101')
            console.log(data)
        }

        fetchData()
    },[])

    return (
        <div className="trustSec"></div>
    )
}

export default TrustPeople