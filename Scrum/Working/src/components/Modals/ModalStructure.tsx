import BtnCloseModal from '../Btn/BtnCloseModal';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import TextND from '../Txt/TextND';
import './ModalStyles.css'

interface ContainerProps {
    setModal: (modal : boolean) => void
    content: JSX.Element
}

type User = {
    nombre : string;
    apellidos : string;
    rating: number;
    sexo: string;
    fecha_nacimiento: string;
    municipio: string;
    tel: string;
    correo: string;
    image: string;
    dpi: string;
    role: string;
    edad: string;
    banner: string;
    departamento: string
}

const ModalStructure: React.FC<ContainerProps> = ({setModal, content}) => {
    return (
        <>
        <div onClick={() => setModal(false)} className="modal-background">
        </div>
            <div className='modal-position'>
                <div className='modal-container'>
                    <div className='header-modal'>
                        <TextND text='Editar Perfil:' size='big' hex='#'/>
                        <BtnCloseModal setModal={setModal}/>
                    </div>
                    <HorizontalDivider/>
                    {content}
                </div>
            </div>
        </>
    )
}

export default ModalStructure