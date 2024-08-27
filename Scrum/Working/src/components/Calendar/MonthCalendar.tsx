import TextND from '../Txt/TextND'
import './calendar.css'

interface ContainerProps {
    monthMatrix: number[][]
}

const MonthCalendar : React.FC<ContainerProps> = ({monthMatrix}) => {
    
    return (
        <div style={{margin: "25px", marginTop: "0" }}>
            <div className='days-label'>
                <b className='day-item' style={{borderRadius: "15px 0 0 0"}}>
                    <TextND text='Lunes' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Martes' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Miercoles' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Jueves' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Viernes' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Sábado' size='small' hex='#000'/>
                </b>
                <b className='day-item' style={{ borderRadius: "0 15px 0 0"}}>
                    <TextND text='Domingo' size='small' hex='#000'/>
                </b>
            </div>
            <div className="calendar-month">
                {
                    monthMatrix.flat().map((day, index) => (
                        <div key={index} className='grid-item'>
                            <div style={{display: "flex", width: "100%", justifyContent: 'flex-end', padding: "10px"}}>
                                {day > 0 ? day : null}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default MonthCalendar