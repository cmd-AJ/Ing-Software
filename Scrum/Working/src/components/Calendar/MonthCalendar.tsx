import { useEffect, useState } from 'react'
import TextND from '../Txt/TextND'
import './calendar.css'
import { get_contrat_by_moventh } from '../../controller/UserController'
import Note from '../Dashboard/Note'
import dayjs from 'dayjs'

interface ContainerProps {
    notes: NoteData[];
    monthMatrix: Date[][]
    monthNumber: number
    setModal: (modal: boolean) => void;
    setSelectedNote: (note: NoteData) => void;  

}

interface NoteData {
    idtrabajo: string
    trabajador: string;
    dia: string;
    hora: string;
    descripcion: string;
    precio: string;
    foto: string;
    timestampcita: string
    pago: string
    imagen: string
    nombre: string
}

const MonthCalendar : React.FC<ContainerProps> = ({ monthMatrix, monthNumber, setModal, setSelectedNote, notes }) => {
    
    const [hiringsMonth, setHiringsMonth] = useState<NoteData[]>([])

    useEffect(() => {
        const data = localStorage.getItem('User')

        const fetchData = async () => {
            if (data) {
                const userData = JSON.parse(data) 
                const hirings = await get_contrat_by_moventh(userData.dpi, monthNumber.toString())
                
                setHiringsMonth(hirings)
            }
        }
        
        fetchData()        
    }, [monthNumber])

    useEffect(() => {
        console.log("Updated hiringsMonth:", hiringsMonth);
    }, [hiringsMonth]);
    

    return (
        <div style={{ margin: "25px", marginTop: "0" }}>
            <div className="calendar-month">
                <b className='day-item' style={{ borderRadius: "15px 0 0 0" }}>
                    <TextND text='Lunes' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Martes' size='small' hex='#000'/>
                </b>
                <b className='day-item'>
                    <TextND text='Miércoles' size='small' hex='#000'/>
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
                <b className='day-item' style={{ borderRadius: "0 15px 0 0" }}>
                    <TextND text='Domingo' size='small' hex='#000'/>
                </b>
                {
                    monthMatrix.flat().map((day, index) => {
                        // Filtramos las contrataciones que coinciden con el día actual

                        return (
                            <div key={index} className='grid-item'>
                                <div style={{ display: "flex", width: "100%", justifyContent: 'flex-end', padding: "10px", flexDirection: 'column' }}>
                                    <div>{day.getDate() > 0 ? day.getDate() : null}</div>
                                    {notes.map((hiring, i) => (
                                        
                                        <>
                                        {
                                            day.getDate() === new Date(hiring.timestampcita).getDate() &&
                                            <div key={i} 
                                                onClick={() => {
                                                    setModal(true)
                                                    setSelectedNote(hiring) 
                                                    console.log(hiring);
                                                       
                                                }}>
                                                <Note 
                                                    trabajador={hiring.nombre}
                                                    hora={dayjs(hiring.timestampcita).format('h:mm A')}
                                                    descripcion={hiring.descripcion}
                                                    foto={hiring.imagen}
                                                />
                                            </div>
                                        }
                                        </>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}

export default MonthCalendar
