import getClient from './../connection/RelationalDatabase.js';
import { createSession } from './../connection/GraphDataBase.js';

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

export async function getWorkers(trabajo) {
    const session = createSession();

    try {
        const query = `MATCH p=(usr:Usuario)-[:trabaja_de]->(tr:Trabajo) WHERE tr.nombre_trabajo = '${trabajo}' RETURN usr LIMIT 25`;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const workers = result.records.map(record => {
            const worker = record.get('tra');
            return {
                nombre: worker.properties.Nombre, // Obtener el nombre del trabajo
                telefono: worker.properties.Telefono,
                municipio: worker.properties.Municipio,
                rating: worker.properties.Rating,
                apellido: worker.properties.Apellido,
                dpi: worker.properties.DPI
            };
        });
        return workers;
    } catch (error) {
        console.error('Error getting workers:', error);
        throw error;
    } finally {
        await session.close();
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

export async function getChatsByUserDPI(dpi) {
    try {
        // Buscar chats donde el DPI proporcionado sea el receptor
        const receiverQuery = {
            text: 'SELECT IDchat, DPIemisor FROM chats WHERE DPIreceptor = $1',
            values: [dpi],
        };

        const receiverChats = await client.query(receiverQuery);

        // Buscar chats donde el DPI proporcionado sea el emisor
        const senderQuery = {
            text: 'SELECT IDchat, DPIreceptor FROM chats WHERE DPIemisor = $1',
            values: [dpi],
        };

        const senderChats = await client.query(senderQuery);

        // Combinar y deduplicar los chats encontrados
        const allChats = [...receiverChats.rows, ...senderChats.rows];
        const uniqueChats = Array.from(new Set(allChats.map(chat => chat.idchat)));

        return uniqueChats;
    } catch (error) {
        console.error('Error getting chats by user DPI:', error);
        throw error;
    }
}

export async function getContactsByUserDPI(dpi) {
    try {
        // Obtener chats donde el usuario es el receptor o el emisor
        const chatQuery = {
            text: 'SELECT DPIemisor, DPIreceptor FROM chats WHERE DPIemisor = $1 OR DPIreceptor = $1',
            values: [dpi],
        };

        const chatResult = await client.query(chatQuery);

        // Obtener DPIs únicos de los chats
        const uniqueDPIs = new Set();
        chatResult.rows.forEach(chat => {
            uniqueDPIs.add(chat.dpiemisor);
            uniqueDPIs.add(chat.dpireceptor);
        });

        // Convertir DPIs únicos a una matriz
        const uniqueDPIsArray = Array.from(uniqueDPIs);

        // Obtener información de usuario para los DPIs únicos
        const userInfoQuery = {
            text: 'SELECT dpi, nombre, apellidos, imagen FROM usuarios WHERE dpi = ANY($1)',
            values: [uniqueDPIsArray],
        };

        const userInfoResult = await client.query(userInfoQuery);

        return userInfoResult.rows;
    } catch (error) {
        console.error('Error getting contacts by user DPI:', error);
        throw error;
    }
}


