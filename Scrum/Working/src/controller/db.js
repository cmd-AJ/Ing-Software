import getClient from './../connection/RelationalDatabase.js';

const client = getClient();

export async function getUsers() {
    try {
        const query = {
            text: 'SELECT * FROM Usuarios',
        };

        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

export async function getUserbyDPI(dpi){
    try {
        const query = {
            text: 'SELECT * FROM Usuarios Where dpi = $1',
            values: [dpi]
        };

        const result = await client.query(query)
        return result.rows
        
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}


export async function insertUser(DPI, name, lastnames, password, email, phoneNumber, role) {
    try {
        const query = {
            text: 'INSERT INTO Usuarios (dpi, nombre, apellidos, contrasenia, email, telefono, role) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            values: [DPI, name, lastnames, password, email, phoneNumber, role],
        };

        const result = await client.query(query);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

export async function setsettings(municipio, imagen, sexo, fecha_nacimiento, numero, DPI, rol, telefono) {
    try {
        const result = await client.query(`update usuarios set municipio = '${municipio}', imagen = '${imagen}', sexo = '${sexo}',  fecha_nacimiento = '${fecha_nacimiento}', numero = ${numero} , rol = ${rol}, telefono = ${telefono} where DPI = '${DPI}'`);
        console.log('Data inserted successfully')
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}


export async function gettrabajo(dpi){
    try {
        const result = await client.query(`select nombre_trabajo  from usuarios left join trabajador on usuarios.dpi = trabajador.dpi where usuarios.dpi = '${dpi}'`
        )
        return result.rows
        
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function getChatBetweenUsers(dpi1, dpi2) {
    try {
        // search de chat id corresponding to both dpi
        const query = {
            text: "SELECT idchat " + 
                  "FROM chats " + 
                  "WHERE (dpireceptor = $1 AND dpiemisor = $2) " + 
                  "OR (dpireceptor = $2 AND dpiemisor = $1)",
            values: [dpi1, dpi2],
        };

        const chatID = await client.query(query)

        // Extract the id
        const chat = chatID.rows[0].idchat

        // Getting the chat messages by dpi
        const messagesQuery = {
            text: "SELECT id_mensaje, contenido, time, dpi " + 
                  "FROM mensaje " +
                  "WHERE id_chat = $1 " +
                  "ORDER BY time ",
                values: [chat]
        }

        const result = await client.query(messagesQuery)

        return result.rows
        
    } catch (error) {
        console.error('Error getting chats by user DPI:', error);
        throw error;
    }
}

export async function getContactsByUserDPI(dpi) {
    try {
        const query = {
            text: "SELECT dpi, imagen AS img, nombre || ' ' || apellidos AS name " + 
                  "FROM usuarios " + 
                  "WHERE dpi IN (" + 
                  "    SELECT dpiemisor FROM chats AS contactos " + 
                  "    WHERE dpireceptor = $1 " + 
                  "    UNION " + 
                  "    SELECT dpireceptor FROM chats AS contactos " +
                  "    WHERE dpiemisor = $1 " +
                  ")",
            values: [dpi],
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error getting contacts by user DPI:', error);
        throw error;
    }
}