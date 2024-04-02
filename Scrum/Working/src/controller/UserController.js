import getClient from './../connection/RelationalDatabase.js';

// Use getClient to get the client instance
const client = getClient();
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });
