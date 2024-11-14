import React, { useEffect, useRef, useState } from 'react';
import './chat.css';
import { IonButton } from '@ionic/react';
import Swal from 'sweetalert2';
import { editMessageFromChat, getChatIdWithDPI, getMessageID, makeHiring } from '../../controller/ChatController';
import dayjs from 'dayjs';

interface ChatBubbleProps {
    message: string;
    time: string;
    sender: 'me' | 'you';
    dpiEmployer: string
    dpiEmployee: string
}

interface Message {
    message: string;
    time: string;
    date: string;
    sender: 'me' | 'you';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, time, sender, dpiEmployee, dpiEmployer }) => {
    const [title, setTitle] = useState("")
    const [hour, setHour] = useState("")
    const [date, setDate] = useState("")
    const [amount, setAmount] = useState("")

    const formattedTime = (timeString: string) => {
        const timePart = timeString.split('T')[1];
        const [hour, minute] = timePart.split(':').slice(0, 2);
        return `${hour}:${minute}`;
    };

    useEffect(()=>{
        const data = localStorage.getItem("contratData")
        if (data != null){
            const formattedData = JSON.parse(data)
            setTitle(formattedData.title)
            setDate(formattedData.date)
            setHour(formattedData.time)
            setAmount(formattedData.amount)
        }
    },[])

    const handleAccept = async () => {
        const dpi = localStorage.getItem('User')
        const dpi2 = localStorage.getItem('SelectedPerson')

        if (dpi != null && dpi2 != null) {
            const hour = dayjs(time).format('HH:mm')
            const dpi1 = JSON.parse(dpi).dpi
            const msg = message + "\nContratación aceptada"
            const chatID = await getChatIdWithDPI(dpi1, dpi2)
            const msgID = await getMessageID(chatID, hour)
    
            const timeStampToUse = date || dayjs().format('YYYY-MM-DD') + 'T' + time;
    
            await editMessageFromChat(msg, chatID, msgID)
            const response = await makeHiring(title, dpiEmployer, dpiEmployee, timeStampToUse, Number(amount));
            try {
                if (response.Success === 'Contrato realizado') {
    
                    Swal.fire({
                    title: "Contratación realizada",
                    text: "Has realizado una contratación con éxito",
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
                    icon: "error",
                    heightAuto: false,
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
    }

    const handleReject = async () => {
        const dpi = localStorage.getItem('User')
        const dpi2 = localStorage.getItem('SelectedPerson')

        if (dpi != null && dpi2 != null) {
            const hour = dayjs(time).format('HH:mm')
            const dpi1 = JSON.parse(dpi).dpi
            const msg = message + "\nContratación rechazada"
            
            const chatID = await getChatIdWithDPI(dpi1, dpi2)
            const msgID = await getMessageID(chatID, hour)
    
            const timeStampToUse = date || dayjs().format('YYYY-MM-DD') + 'T' + time;
    
            await editMessageFromChat(msg, chatID, msgID.id_mensaje)
        }
        
    }

    const formattedMessage = message.replace(/\n/g, '<br />');

    return (
        <div className={`chat-bubble ${sender === 'me' ? 'me' : 'you'}`}>
            <div 
                className="message-content"
                dangerouslySetInnerHTML={{__html: formattedMessage}}/>
                {(formattedMessage.includes("-----------------------------") && (!formattedMessage.includes("Propuesta aceptada") || !formattedMessage.includes("Propuesta rechazada")))&& <>
                <IonButton color="danger" onClick={handleReject}>Rechazar</IonButton>
                <IonButton color="success" onClick={handleAccept}>Aceptar</IonButton></>}
            <div className="message-time">{formattedTime(time)}</div>
        </div>
    );
};

interface ChatProps {
    messages: Message[];
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

const Chat: React.FC<ChatProps> = ({ messages }) => {
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
                        <ChatBubble message={msg.message} time={msg.time} sender={msg.sender} dpiEmployee={dpiEmployee ? dpiEmployee : ""} dpiEmployer={dpiEmployer ? dpiEmployer : ""}/>
                    </React.Fragment>
                );
            })}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Chat;
