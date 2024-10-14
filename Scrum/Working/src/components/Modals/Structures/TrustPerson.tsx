import React from "react"
import './TrustedStyle.css'
import TextND from "../../Txt/TextND"

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
            <div style={{display: 'flex', height: '100%', width: '50%'}}>
                <img src={img} alt="" style={{borderRadius: '50%', width: '15%', height: '20%', position: 'unset'}}/>
                <div style={{display: 'flex', alignItems: 'center', marginLeft: '5px', flexDirection: 'column'}}>
                   <TextND text={`${nombre} ${apellido}`} hex="#000" size="medium"/>
                   <TextND text={tel} hex="#000" size="medium"/> 
                </div>
            </div>
            <TextND text={rating.toString()} hex="#000" size="medium"/>
        </div>
    )
}

export default TrustPerson