import { text } from 'express';
import getClient from './RelationalDatabase.js';

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

export async function getUserbyDPI(dpi) {
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

export async function setsettings(municipio, imagen, sexo, fecha_nacimiento, DPI, rol, telefono, trabajo) {
    try {
        const result = await client.query(`update usuarios set municipio = '${municipio}', imagen = '${imagen}', sexo = '${sexo}',  fecha_nacimiento = '${fecha_nacimiento}', role = '${rol}', telefono = '${telefono}' where DPI = '${DPI}'`);
        console.log('Data inserted successfully')
        if (rol !== 'Empleador') {
            updatetrab(trabajo, DPI)
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}



export async function gettrabajo(dpi) {
    try {
        const result = await client.query(`select nombre_trabajo  from usuarios left join trabajador on usuarios.dpi = trabajador.dpi where usuarios.dpi = '${dpi}'`
        )
        return result.rows

    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function getChatID(dpi1, dpi2) {
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
        return chatID.rows

    } catch (error) {
        console.error('Error getting chats by user DPI:', error);
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
            text: "SELECT id_chat, id_mensaje, contenido, time, dpi " +
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



export async function updatetrab(trabajo, dpi) {
    try {
        const result = await client.query(`UPDATE trabajador set nombre_trabajo  = '${trabajo}' where dpi = '${dpi}';`);
        console.log('Data updated  successfully')
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

//SIN SABTE
export async function gettrabajoant(dpi) {
    try {
        const result = await client.query(`select titulo, estado, dpitrabajador, imagen  from completado where dpiempleador is null and dpitrabajador = '${dpi}'`
        )
        return result.rows
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

//Trabajados en SABTE
export async function gettrabajoSABTE(dpi) {
    try {
        const result = await client.query(`select titulo, estado, imagen from completado where dpiempleador is not null and dpitrabajador = '${dpi}'`)
        return result.rows
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}


//Estado es la descripcion eg. Se termino con aticipio o lo mejor de todo
export async function insertartrabant(dpitrabajador, dpiempleador, titulo, estado, imagen) {
    try {
        const result = await client.query(`insert into completado(estado, dpitrabajador, dpiempleador, titulo, imagen) values( '${estado}', '${dpitrabajador}', '${dpiempleador}', '${titulo}', '${imagen}' )`);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

export async function insertartipotrabajo(nombre_trabajo, descripcion) {
    try {
        const result = await client.query(`insert into tipotrabajo (nombre_trabajo, descripcion) values ( '${nombre_trabajo}', '${descripcion}' )`);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}



export async function insertChatMessage(contenido, id_chat, dpi) {
    try {
        const query = {
            text: "INSERT INTO mensaje(contenido, id_chat, dpi, time) VALUES( $1, $2, $3, CURRENT_TIMESTAMP)",
            values: [contenido, id_chat, dpi]
        }
        await client.query(query)
        console.log("Added message to chat")

    } catch (error) {
        console.error('Error inserting message:', error)
        throw error;
    }
}

export async function insertHiring(descripcion, dpiempleador, dpiempleado, timeStampCita) {
    try {
        const query = {
            text: "INSERT INTO trabajodisponible(descripcion, dpiempleador, dpiempleado, timeStampCita, timestampcontratacion) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)",
            values: [descripcion, dpiempleador, dpiempleado, timeStampCita]
        }
        await client.query(query)

    } catch (error) {
        console.error('Error while hiring', error)
        throw error;
    }
}

export async function getCurrentHirings(dpi) {
    try {
        const query = {
            text: "SELECT td.dpiempleado, u.nombre || ' ' ||u.apellidos AS nombre, u.telefono, u.imagen, td.descripcion, td.timestampcita " +
                  "FROM trabajodisponible td " +
                  "JOIN usuarios u ON (td.dpiempleado = u.dpi) " +
                  "WHERE td.dpiempleador = $1 ",
            values: [dpi]
        }

        const result = await client.query(query)
        return result.rows
    } catch (error) {
        console.error("Error whil getting hirings")
        throw error
    }
}