export async function editMessageFromChat(new_msg: string, chatId: string, msgId: string) {
    try {
        const data = {
            contenido: new_msg,
            id_chat: chatId,
            id_msg: msgId
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/editMessage`, {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error("Failed to edit message");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error while editing message:", error);
        throw error;
    }
}


export async function getContacts(dpi: String) {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/${dpi}`, {
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

export async function getChatMessages(dpi1: string, dpi2: string) {
    try {
        const data = {
            dpi1: dpi1,
            dpi2: dpi2
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/messages`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat messages');
        }

        const responseData = await response.json();

        return responseData;
    } catch (error) {
        console.error("Error while getting chat messages:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function getChatIdWithDPI(dpi1: string, dpi2: string) {
    try {
        const data = {
            dpi1: dpi1,
            dpi2: dpi2
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/chatID`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat ID');
        }

        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error("Error while getting chat ID:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function chatBetweenUsersExist(dpi1: string, dpi2: string) {

    const chatIDResponse = await getChatIdWithDPI(dpi1, dpi2)

    if (chatIDResponse.length == 0) {
        return false
    }

    return true
}

export async function createNewChatIfNotExists(dpi1: string, dpi2: string) {

    const chatExists = await chatBetweenUsersExist(dpi1, dpi2)

    if (!chatExists) {
        //Create new chat calling the endpoint /contacts/createChat
        try {
            const data = {
                dpi1: dpi1,
                dpi2: dpi2
            };

            const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/createChat`, {
                method: 'POST',
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to create chat');
            }
        } catch (error) {
            console.error("Error while creating chat:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
}

export async function insertChatMessage(content: string, chatID: string, dpi: string) {
    try {
        const data = {
            contenido: content,
            id_chat: chatID,
            dpi: dpi
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/message`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to post message');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error while inserting message:", error);
        throw error;
    }
}

export async function makeHiring(description: string, dpiEmployer: string, dpiEmployee: string, appointmentTimeStamp: string, payment: number) {
    try {
        // Convert the Guatemalan time (UTC-6) to UTC
        const localTime = new Date(appointmentTimeStamp);
        const offset = localTime.getTimezoneOffset() * 60000; // offset in milliseconds
        const utcTime = new Date(localTime.getTime() + offset);

        const data = {
            descripcion: description,
            dpiempleador: dpiEmployer,
            dpiempleado: dpiEmployee,
            timeStampCita: utcTime.toISOString(), // Converts to UTC string
            pago: payment
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/hire`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to Hire worker');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error while hiring worker:", error);
        throw error;
    }
}



export async function getHirings(dpi: string) {

    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/hirings/${dpi}`, {
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        // Convert the UTC timestamp to Guatemalan time and adjust variables
        const adjustedData = data.map((hiring: any) => {
            const utcDate = new Date(hiring.timestampcita);
            const guatemalaOffset = -6 * 60; // offset in minutes
            const guatemalaTime = new Date(utcDate.getTime() + (guatemalaOffset * 60 * 1000));

            // Extract the date and time components
            const dia = guatemalaTime.toISOString().substring(0, 10); // Extracts 'YYYY-MM-DD'

            // Get hours and minutes for formatting
            let hours = guatemalaTime.getHours();
            const minutes = guatemalaTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // If hour is 0, convert it to 12
            const minutesStr = minutes < 10 ? '0' + minutes : minutes;
            const hora = `${hours}:${minutesStr} ${ampm}`;

            // Assign the new values to the object
            hiring.dia = dia;
            hiring.hora = hora;

            // Add "Q." prefix to precio
            hiring.precio = `Q.${hiring.precio}`;

            // Optionally remove the original timestampcita if it's no longer needed
            delete hiring.timestampcita;

            return hiring;
        });

        return adjustedData;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}



export async function sendmessages(dpi: string, method :string) {
    try {
        if (method === 'correo') {
            
            const data = {
                nombre: dpi
            };
    
            const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/sendforgot_mail/`, {
                method: 'POST',
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to send a mail');
            }else{
                return true
            }

        }
        if (method === 'telefono') {

            const data = {
                dpi:dpi
            };
    
            const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/sendforgot_phone/`, {
                method: 'POST',
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
    
            if (!response.ok) {
                throw new Error('Failed to send a phone notification');
            }
            else{
                return true    
            }
    

        }


    } catch (error) {
        console.error("Error while hiring worker:", error);
        throw error;
    }
}


export async function getcode(dpi: String, code:string) {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/getcode/${dpi}`, {
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (data[0].code === code){
            return true
        }
        else{
            return false
        }

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return false;
    }
}


export async function cambiarcontra(password: string, dpi: string) {
    const object = {
        password: password,
        dpi: dpi,
    }
    

    const data = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/codechange`,
        {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
    return data
}



export async function getreview(id : string) {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/review/${id}`, {
        method: 'GET',
        headers: {
          'api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to get DPI for the given idtrabajo');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching DPI by idtrabajo:', error);
      throw error;
    }
}