import getClient from './../connection/RelationalDatabase.js';
import driver from './../connection/GraphDataBase.js'

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

export async function getJobs() {
    const session = driver.session();

    try {
        const query = 'MATCH (t:Trabajo) RETURN t.nombre_trabajo AS nombre_trabajo';
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de nombres de trabajos
        const jobs = result.records.map(record => record.get('nombre_trabajo'));
        return jobs;
    } catch (error) {
        console.error('Error getting jobs:', error);
        throw error;
    } finally {
        await session.close();
    }
}


