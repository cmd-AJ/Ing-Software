import neo4j from 'neo4j-driver';

const URI = process.env.NEO4J_URI || 'neo4j+s://c3d6cd62.databases.neo4j.io';
const user = process.env.NEO4J_USER || 'neo4j';
const password = process.env.NEO4J_PASSWORD || 'a_r3k6d-n8v8u4f1AxnCYNt_VlycV3R-trdTIxZpWPA';

function createSession() {
    const driver = neo4j.driver(URI, neo4j.auth.basic(user, password));
    return driver.session();
}

export { createSession };
