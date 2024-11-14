import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import { IonButton } from '@ionic/react';
import Swal from 'sweetalert2';
import { editMessageFromChat, getChatIdWithDPI, getMessageID, makeHiring, setHiringState } from '../../controller/ChatController';
import dayjs from 'dayjs';

interface ChatBubbleProps {
    message: string;
    time: string;
    sender: 'me' | 'you';
    dpiEmployer: string
    dpiEmployee: string
    hiring : boolean
    idChat : string
}

interface Message {
    message: string;
    time: string;
    date: string;
    sender: 'me' | 'you';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, time, sender, dpiEmployee, dpiEmployer, hiring, idChat }) => {
    const [title, setTitle] = useState("")
    const [hour, setHour] = useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")

    const formattedTime = (timeString: string) => {
        const timePart = timeString.split('T')[1];
        const [hour, minute] = timePart.split(':').slice(0, 2);
        return `${hour}:${minute}`;
    };

    useEffect(() => {
        // Expresión regular para extraer los datos de la propuesta
        const proposalRegex = /Propuesta de contratación\s+-----------------------------\s+(.+)\s+Fecha:\s+(\d{2})\/(\d{2})\/(\d{4})\s+Hora:\s+(\d{2}):(\d{2})\s+Precio:\s+Q\.(\d+)/;
    
        const match = proposalRegex.exec(message);
    
        if (match) {
            const [_, proposalTitle, day, month, year, hour, minute, proposalAmount] = match;
    
            // Actualizamos los estados con los datos formateados
            setTitle(proposalTitle.trim());  // Título de la propuesta
            setDate(dayjs(`${year}-${month}-${day}T${hour}:${minute}`).format("YYYY-MM-DDTHH:mm")); // Fecha en formato deseado
            setHour(`${hour}:${minute}`);    // Hora
            setAmount(proposalAmount);       // Precio
        }
    }, [message]); // Solo se ejecutará cuando el mensaje cambie
        

    const handleAccept = async () => {
       
        const hour = dayjs(time).add(6, 'hour').format('HH:mm')
        console.log(message);
        const msg = message + "\nPropuesta aceptada"

        const msgID = await getMessageID(idChat, hour)
    
        const timeStampToUse = date || dayjs().format('YYYY-MM-DD') + 'T' + time;
    console.log(date);
    
        await editMessageFromChat(msg, idChat, msgID.id_mensaje)
        
        const response = await makeHiring(title, dpiEmployer, dpiEmployee, timeStampToUse, Number(amount));
        
        try {
            if (response.Success === 'Contrato realizado') {

                await setHiringState(idChat, false)
    
                Swal.fire({
                    title: "Contratación realizada",                    text: "Has realizado una contratación con éxito",
                    icon: "success",
                    heightAuto: false,
                    timer: 2500,
                    timerProgressBar: true,
                    showCloseButton: false,
                    showConfirmButton: false
                });
            } else {

                Swal.fire({
                    title: "Contratacion Fallida",
                    text: "No se ha podido realizar la contratación ",
                    icon: "error",                    heightAuto: false,
                    timer: 2500,
                    timerProgressBar: true, // Optional: show a progress bar
                    showCloseButton: false, // Hide the close button
                    showConfirmButton: false // Hide the OK button
                });
            }
        } catch (error) {
            console.error('Error al contratar:', error);
        }
        
    }

    const handleReject = async () => {

        const hour = dayjs(time).add(6, 'hour').format('HH:mm')
        const msg = message + "\nPropuesta rechazada"

        const msgID = await getMessageID(idChat, hour)
  
        await editMessageFromChat(msg, idChat, msgID.id_mensaje)
        
    }

    const formattedMessage = message.replace(/\n/g, '<br />');

    return (
        <div className={`chat-bubble ${sender === 'me' ? 'me' : 'you'}`}>
            <div 
                className="message-content"
                dangerouslySetInnerHTML={{__html: (sender === 'me' && !formattedMessage.includes("Propuesta aceptada") && 
                    !formattedMessage.includes("Propuesta rechazada")) ? (formattedMessage + "\nEsperando respuesta").replace(/\n/g, '<br />')
                
                : formattedMessage}}/>
                {(formattedMessage.includes("-----------------------------") && 
                (!formattedMessage.includes("Propuesta aceptada") && 
                !formattedMessage.includes("Propuesta rechazada")) && sender !== 'me') && <>
                <IonButton color="danger" onClick={handleReject}>Rechazar</IonButton>
                <IonButton color="success" onClick={handleAccept}>Aceptar</IonButton></>}
            <div className="message-time">{formattedTime(time)}</div>
        </div>
    );
};

interface ChatProps {
    messages: Message[];
    hiring : boolean
    idChat : string
}

const formatDateDivider = (date: string) => {
    const messageDate = new Date(date);
    const today = new Date();

    // Comparar si la fecha es hoy
    if (messageDate.toDateString() === today.toDateString()) {
        return "Hoy";
    }

    // Formatear la fecha si no es hoy
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return messageDate.toLocaleDateString('es-ES', options);
};

const Chat: React.FC<ChatProps> = ({ messages, hiring, idChat }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Función para hacer scroll al final de la lista de mensajes
    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Hacer scroll automáticamente cuando cambian los mensajes
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    let lastDate = ""; // Controla la última fecha para el divisor
    
    const dpiEmployer = localStorage.getItem('dpi');
    const dpiEmployee = localStorage.getItem('SelectedPerson');

    return (
        <div className="chat-container">
            {messages.map((msg, index) => {
                const showDateDivider = msg.date !== lastDate;
                lastDate = msg.date;

                return (
                    <React.Fragment key={index}>
                        {showDateDivider && (
                            <div className="date-divider">
                                {` ${formatDateDivider(msg.date)} `}
                            </div>
                        )}
                        <ChatBubble 
                            message={msg.message} 
                            time={msg.time} 
                            sender={msg.sender} 
                            dpiEmployee={dpiEmployee ? dpiEmployee : ""} 
                            dpiEmployer={dpiEmployer ? dpiEmployer : ""}
                            hiring={hiring}
                            idChat={idChat}
                        />
                    </React.Fragment>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Chat;
