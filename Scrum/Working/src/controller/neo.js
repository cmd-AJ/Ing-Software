import { createSession } from './GraphDataBase.js';

export async function insertNewJob(job, description) {
    const session = createSession();

    try {
        const query = `CREATE (:Trabajo {nombre_trabajo:'${job}', descripcion:'${description}'})`;

        const result = await session.run(query);

        return result
    } catch (error) {
        console.error("Error while adding new job", error);
        throw error;
    } finally {
        await session.close();
    }
}

export async function getAllTrabajos() {
    const session = createSession();

    try {
        const query = `MATCH (n:Trabajo) RETURN n`;

        const result = await session.run(query);

        // Extracting and formatting the data
        const trabajos = result.records.map(record => record.get('n').properties);
        
        return trabajos;

    } catch (error) {
        console.error('Error retrieving trabajos:', error);
        throw error;
    } finally {
        await session.close();
    }
}

export async function addUserAsTrustedPerson(dpi1, dpi2) {
    const session = createSession();

    try {
        const query = `MATCH (usr1:Usuario {dpi:'${dpi1}'}), (usr2:Usuario {dpi:'${dpi2}'})
                       CREATE (usr1)-[:confia_en]->(usr2)`

        const result = await session.run(query)
        return result

    } catch (error) {
        console.error('Error adding user as trusted person:', error);
        throw error;
    } finally {
        await session.close();
    }

}

export async function creatNeoUser(nombre, apellidos, municipio, rating, imagen, dpi, telefono) {
    const session = createSession();

    try {
        const query = `CREATE (:Usuario {nombre: '${nombre}', apellidos: '${apellidos}', municipio: '${municipio}', rating: '${rating}', imagen: '${imagen}', dpi: '${dpi}', telefono:'${telefono}'})`;
        const result = await session.run(query);

        return result;
    } catch (error) {
        console.error('Error inserting Neo User:', error);
        throw error;
    } finally {
        await session.close();
    }

}

export async function updateNeoUser(dpi, municipio, imagen, telefono) {
    const session = createSession();

    try {
        const query = `MATCH (usr:Usuario {dpi: '${dpi}'})
                       SET usr.municipio = '${municipio}', usr.imagen = '${imagen}',  usr.telefono = '${telefono}'
                       RETURN usr
                        `;
        const result = await session.run(query);

        return result;
    } catch (error) {
        console.error('Error updating neo user')
        throw error;
    } finally {
        await session.close();
    }
}

export async function getWorkers(trabajo) {
    const session = createSession();

    try {
        // Using parameterized query and Levenshtein distance for fuzzy matching
        const query = `
            MATCH (usr:Usuario)-[:trabaja_de]->(tr:Trabajo)
            WHERE apoc.text.levenshteinDistance(toLower(tr.nombre_trabajo), toLower($trabajo)) <= 3
            RETURN usr, tr.nombre_trabajo AS nombre_trabajo LIMIT 25
        `;
        const result = await session.run(query, { trabajo });

        const workers = result.records.map(record => {
            const worker = record.get('usr');
            const nombreTrabajo = record.get('nombre_trabajo');
            return {
                nombre: worker.properties.nombre,
                telefono: worker.properties.telefono,
                municipio: worker.properties.municipio,
                rating: worker.properties.rating,
                apellidos: worker.properties.apellidos,
                imagen: worker.properties.imagen,
                dpi: worker.properties.dpi,
                nombre_trabajo: nombreTrabajo
            };
        });
        return workers;
    } catch (error) {
        console.error('Error getting workers:', error);
        throw error;
    } finally {
        await session.close();
    }
}

// Este comentario que estoy commiteando es para dejar constancia del trabajo que realice en el proyecto del día de hoy
// Hice algunos ajustes en neo4j y aque habían algunas personas que no tenían rating
// Agreguéaún más trabajos dentro de la base de dats de neo
// PRobé queries en la basa de datos para poder obtener el rating de una persona SELECT usr.rating FROM usuarios usr WHERE usr.dpi = $1
// Este último no me dio tiempo a implementarlo pero si lo trabajé también.

//Al final este comentario lo pongo más que todo para dejar constancia de la integración continua.
//ya que el trabajo realizado fuera del repo no tiene un commit como tal :)

export async function getTrustedUsersByDpi(dpi) {
    const session = createSession();

    try {
        const query = `MATCH p=(usr1:Usuario {dpi: '${dpi}'})-[:confia_en]->(usr2:Usuario) RETURN usr2 ORDER BY usr2.Rating DESC`;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const users = result.records.map(record => {
            const user = record.get('usr2');
            return {
                nombre: user.properties.nombre, // Obtener el nombre del trabajo
                telefono: user.properties.telefono,
                municipio: user.properties.municipio,
                rating: user.properties.rating,
                apellido: user.properties.apellidos,
                dpi: user.properties.dpi,
                imagen: user.properties.imagen
            };
        });
        return users;
    } catch (error) {
        console.error('Error getting trusted users:', error);
        throw error;
    } finally {
        await session.close();
    }

}