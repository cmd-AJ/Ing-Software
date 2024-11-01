import pkg from 'pg';
const { Client } = pkg;

const dbConfig = {
    user: 'postgres',
    password: '98382ad6b1a3facbd3c418a8a4ade51a555a9008a50d4ba892b43fd48d4da546',
    host: '34.197.54.116',
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
