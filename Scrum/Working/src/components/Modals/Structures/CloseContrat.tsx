import { IonButton } from '@ionic/react';
import BtnAction from '../../Btn/BtnAction';
import './close_struct.css';

// Interfaz de las props
interface ContainerProps {
    setShow: (show: boolean) => void;
    trabajo: string;
    pago: string | number;  // Puede ser string o number
    foto: string;
    descripcion: string;
}

const CloseContrat: React.FC<ContainerProps> = ({ setShow, trabajo, pago, foto, descripcion }) => {
    // Función para obtener la fecha actual en el formato requerido
    const obtenerFechaActual = (): string => {
        const fecha = new Date();
        const opciones: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        };
        return fecha.toLocaleDateString('es-ES', opciones);
    };

    // Función para obtener la hora actual en formato 12 horas con AM/PM
    const obtenerHoraActual = (): string => {
        const fecha = new Date();
        const hora = fecha.getHours();
        const minutos = fecha.getMinutes();
        const ampm = hora >= 12 ? 'PM' : 'AM';
        const horaFormato12 = hora % 12 || 12; // Ajusta para formato 12 horas
        const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos; // Asegura dos dígitos
        return `${horaFormato12}:${minutosFormateados}${ampm}`;
    };

    return (
        <div className='close-container'>
            {/* Fila 1: Icono personalizado */}
            <div className='icon-row'>
                <img src="/ep_finished.svg" alt="Icono de finalizar" className='custom-icon'/>
            </div>
            
            {/* Fila 2: Título */}
            <div className='title-row'>
                <span>¿Quieres dar por finalizado el trabajo de {trabajo}?</span>
            </div>
            
            {/* Fila 3: Información dinámica */}
            <div className='info-row'>
                {/* Columna izquierda: Información en spans */}
                <div className='info-text'>
                    <span>TRABAJO: {descripcion || 'Descripción no disponible'}</span> 
                    <span>FECHA: {obtenerFechaActual()}</span>
                    <span>HORA: {obtenerHoraActual()}</span>
                    <span>PAGO: {pago}.00</span> {/* Mostrar el pago con dos decimales */}
                </div>

                {/* Columna derecha: Imagen redonda recibida por prop */}
                <div className='info-image'>
                    <img src={foto} alt="Imagen de usuario" className="rounded-image" />
                </div>
            </div>

            {/* Fila 4: Botones */}
            <div className='buttons-row'>
                <button className="cancel-button" onClick={() => setShow(false)}>
                    Cancelar
                </button>

                <button className="confirm-button" onClick={() => setShow(false)}>
                    Confirmar
                </button>
            </div>
        </div>
    );
};

export default CloseContrat;
