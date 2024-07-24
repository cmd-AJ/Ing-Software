import pkg from 'pg';
const { Client } = pkg;

const dbConfig = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.POSTGRES_DB,
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
