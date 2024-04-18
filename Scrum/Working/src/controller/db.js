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


export async function setsettings(municipio, imagen, sexo, fecha_nacimiento, rating, numero, DPI) {
    try {
        const result = await client.query(`update usuarios set municipio = '${municipio}', imagen = '${imagen}', sexo = '${sexo}', fecha_nacimiento = '${fecha_nacimiento}', rating = '${rating}', numero = ${numero} where DPI = '${DPI}'`);
        console.log('Data inserted successfully')
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

