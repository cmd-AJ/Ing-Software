
import './Toggle.css'
import TextND from '../Txt/TextND'

interface ContainerProps {
    typeCalendar: string
    setTypeCalendar: (typeCalendar: string) => void
}

const DoubleToggle: React.FC<ContainerProps> = ({typeCalendar,setTypeCalendar}) => {

    return (
        <div className='toggle-container'>
            <div
                onClick={() => setTypeCalendar('mes')}
                className='toggle-element' 
                style={{
                backgroundColor: typeCalendar == 'mes' ? "#FFF" : "transparent"
                }}
            >
                <TextND text='Mes' size='medium' hex='#000'/>
            </div>
            <div
                onClick={() => setTypeCalendar('semana')}
                className='toggle-element' 
                style={{
                backgroundColor: typeCalendar == 'semana' ? "#FFF" : "transparent"
                }}
            >
                <TextND text='Semana' size='medium' hex='#000'/>
            </div>
        </div>
    )
}

export default DoubleToggle