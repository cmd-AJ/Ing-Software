export async function getContacts(dpi: String) {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/${dpi}`,{
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

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/messages`, {
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

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/chatID`, {
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
        console.log(responseData);
        return responseData;

    } catch (error) {
        console.error("Error while getting chat ID:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
}

export async function insertChatMessage(content: string, chatID: string, dpi: string) {
    try {
        const data = {
            contenido: content,
            id_chat: chatID,
            dpi: dpi
        };

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/message`, {
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

export async function makeHiring(description: string, dpiEmployer: string, dpiEmployee: string, appointmentTimeStamp: string) {
    try {
        // Convert the Guatemalan time (UTC-6) to UTC
        const localTime = new Date(appointmentTimeStamp);
        const offset = localTime.getTimezoneOffset() * 60000; // offset in milliseconds
        const utcTime = new Date(localTime.getTime() + offset);

        const data = {
            descripcion: description,
            dpiempleador: dpiEmployer,
            dpiempleado: dpiEmployee,
            timeStampCita: utcTime.toISOString() // Converts to UTC string
        };

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/hire`, {
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
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/hirings/${dpi}`,{
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        // Convert the UTC timestamp to Guatemalan time
        const adjustedData = data.map((hiring: any) => {
            const utcDate = new Date(hiring.timestampcita);
            // Guatemala is UTC-6
            const guatemalaOffset = -6 * 60; // offset in minutes
            const guatemalaTime = new Date(utcDate.getTime() + (guatemalaOffset * 60 * 1000));
            // Format the date as a string or keep it as a Date object depending on your needs
            hiring.timestampcita = guatemalaTime.toISOString().replace('T', ' ').substring(0, 19); // This formats the date as 'YYYY-MM-DD HH:MM:SS'
            return hiring;
        });

        return adjustedData;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}
