import { createSession } from './GraphDataBase.js';
import { getUserRatingWithDPI } from './db.js';

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

export async function getWorkersByFlexibleName(nombreCompleto) {
    const session = createSession();

    try {
        // Separar el nombre completo en palabras y enviar como parámetro a Neo4j
        const palabras = nombreCompleto.toLowerCase().split(" ");

        // Query en Neo4j para realizar coincidencias flexibles en cada palabra
        const query = `
            WITH $palabras AS palabras
            MATCH (usr:Usuario)
            WHERE ANY(palabra IN palabras WHERE 
                apoc.text.levenshteinDistance(palabra, toLower(usr.nombre)) <= 3 OR 
                apoc.text.levenshteinDistance(palabra, toLower(usr.apellidos)) <= 3
            )
            RETURN usr LIMIT 25
        `;

        // Ejecutar la consulta y enviar el array de palabras como parámetro
        const result = await session.run(query, { palabras });

        const workers = result.records.map(record => {
            const worker = record.get('usr');
            return {
                nombre: worker.properties.nombre,
                apellidos: worker.properties.apellidos,
                telefono: worker.properties.telefono,
                municipio: worker.properties.municipio,
                rating: worker.properties.rating,
                dpi: worker.properties.dpi,
                imagen: worker.properties.imagen
            };
        });

        return workers;
    } catch (error) {
        console.error('Error getting workers by flexible name:', error);
        throw error;
    } finally {
        await session.close();
    }
}


export async function getTrustedUsersByDpi(dpi) {
    const session = createSession();

    try {
        const query = `
            MATCH p=(usr1:Usuario {dpi: '${dpi}'})-[:confia_en]->(usr2:Usuario) 
            RETURN usr2 
            ORDER BY usr2.rating DESC
        `;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const users = await Promise.all(result.records.map(async record => {
            const user = record.get('usr2');
            const ratingFromPostgres = await getUserRatingWithDPI(user.properties.dpi); // Obtener el rating postgre

            return {
                nombre: user.properties.nombre,
                telefono: user.properties.telefono,
                municipio: user.properties.municipio,
                rating: ratingFromPostgres || user.properties.rating, // Usa el rating de PostgreSQL si existe
                apellido: user.properties.apellidos,
                dpi: user.properties.dpi,
                imagen: user.properties.imagen
            };
        }));

        return users;
    } catch (error) {
        console.error('Error getting trusted users:', error);
        throw error;
    } finally {
        await session.close();
    }
}
