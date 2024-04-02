import { Client } from 'pg';

const dbConfig = {
    user: 'username',
    password: 'password',
    host: 'host',
    port: 'port_number',
    database: 'database_name',
};

const getClient = () => {
    const client = new Client(dbConfig);
    return client;
};

export default getClient;
