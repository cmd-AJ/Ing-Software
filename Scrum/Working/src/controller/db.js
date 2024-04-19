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

export async function setsettings(municipio, imagen, sexo, fecha_nacimiento, rating, numero, DPI) {
    try {
        const result = await client.query(`update usuarios set municipio = '${municipio}', imagen = '${imagen}', sexo = '${sexo}', fecha_nacimiento = '${fecha_nacimiento}', rating = '${rating}', numero = ${numero} where DPI = '${DPI}'`);
        console.log('Data inserted successfully')
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

export async function getWorkers(trabajo) {
    const session = createSession();

    try {
        const query = `MATCH p=(tra:Trabajador)-[:trabaja_de]->(tr:Trabajo) WHERE tr.nombre_trabajo = '${trabajo}' RETURN tra LIMIT 25`;
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


