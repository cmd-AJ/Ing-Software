import neo4j from 'neo4j-driver';

var graphDB = neo4j

const URI = 'neo4j+s://3805d5ba.databases.neo4j.io:7687'
const user = 'neo4j'
const password = 'm2FnqjxJjrcve7-tqOVCmzgggmB9gKg_g13oOaB2JPw'
let driver
let session

try {
    driver = graphDB.driver(URI,neo4j.auth.basic(user, password))
    session = driver.session();
    console.log("Connected to Neo4J")
} catch (error) {
    console.log(`Connection error\n${err}\nCause: ${err.cause}`)
}

export default session;