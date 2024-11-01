import {useEffect, useState} from 'react'
import RateBar from "../Miscellaneous/RateBar"
import TextND from "./TextND"
import './TxtStyles.css'

interface ContainerProps {
    text1: string
    rating: number
    userRole: boolean
}

const UserText: React.FC<ContainerProps> = ({text1, rating, userRole}) => {

    const tertiaryColor = getComputedStyle(document.documentElement).getPropertyValue('--ion-color-tertiary').trim()

    const [role, setRole] = useState("Ciudadano")

    useEffect(() => {
	if (!userRole) {
		setRole("Ciudadano")	
	} else {
		setRole("Empleado")
	}
    },[userRole])

    return (
        <div className="vertical-txt-display" >
            <TextND text={text1} size="medium" hex={tertiaryColor}/>
            <TextND text={role} size="big" hex={tertiaryColor}/>
            { userRole &&
	    <RateBar rating={rating}/>}
            
        </div>
    )
}

export default UserText
