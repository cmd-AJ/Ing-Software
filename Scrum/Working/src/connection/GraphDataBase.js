import neo4j from 'neo4j-driver';

const URI = 'neo4j+s://3805d5ba.databases.neo4j.io:7687';
const user = 'neo4j';
const password = 'm2FnqjxJjrcve7-tqOVCmzgggmB9gKg_g13oOaB2JPw';

function createSession() {
    const driver = neo4j.driver(URI, neo4j.auth.basic(user, password));
    return driver.session();
}

export { createSession };
