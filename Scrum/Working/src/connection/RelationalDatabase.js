import pkg from 'pg';
const { Client } = pkg;

const dbConfig = {
    user: 'postgres',
    password: '3955017c702d0c4040a738f2359219a9b0c1a290eb3252c9efd38a239efaf0aa',
    host: '3.212.157.247',
    port: '5432',
    database: 'postgres',
};

// Establishing the connection to the db
const client = new Client(dbConfig);
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });

// Export a function to obtain the client instance
const getClient = () => {
    return client;
};

export default getClient;
