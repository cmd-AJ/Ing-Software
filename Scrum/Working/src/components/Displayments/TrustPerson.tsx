import React from "react"
import './DisplaymentStyles.css'

interface ContainerProps {
    nombre: string
    apellido: string
    rating: number
    img: string
    tel : string
 }

const TrustPerson: React.FC<ContainerProps> = ({nombre, apellido, rating, img, tel}) => {
    return (
        <div className="persondatadisplay">
            <div style={{display: 'flex', height: '100%'}}>
                <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' alt="" style={{borderRadius: '50%', width: '15%', height: '20%', position: 'unset'}}/>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '5px', flexDirection: 'column'}}>
                   <p>{nombre}</p>
                   <p>{tel}</p> 
                </div>
            </div>
            <p style={{ fontSize: '30px'}}>
                {rating}
            </p>
        </div>
    )
}

export default TrustPerson