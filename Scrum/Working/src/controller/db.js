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

export async function insertUser(name, lastnames, password, email, phoneNumber, role) {
    try {
        const query = {
            text: 'INSERT INTO Usuarios (Nombre, Apellidos, Contrasenia, Email, Telefono) VALUES ($1, $2, $3, $4, $5)',
            values: [name, lastnames, password, email, phoneNumber],
        };

        const result = await client.query(query);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}
