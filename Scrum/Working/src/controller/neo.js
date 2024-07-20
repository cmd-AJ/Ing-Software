import { createSession } from './GraphDataBase.js';

export async function getWorkers(trabajo) {
    const session = createSession();

    try {
        const query = `MATCH p=(usr:Usuario)-[:trabaja_de]->(tr:Trabajo) WHERE tr.nombre_trabajo = '${trabajo}' RETURN usr LIMIT 25`;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const workers = result.records.map(record => {
            const worker = record.get('usr');
            return {
                nombre: worker.properties.nombre, // Obtener el nombre del trabajo
                telefono: worker.properties.telefono,
                municipio: worker.properties.municipio,
                rating: worker.properties.rating,
                apellido: worker.properties.apellidos,
                dpi: worker.properties.dpi
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


export async function getTrustedUsersByDpi(dpi){
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
                apellido: user.properties.apellido,
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