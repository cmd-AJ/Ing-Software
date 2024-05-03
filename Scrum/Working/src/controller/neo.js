import { createSession } from './../connection/GraphDataBase.js';

export async function getWorkers(trabajo) {
    const session = createSession();

    try {
        const query = `MATCH p=(usr:Usuario)-[:trabaja_de]->(tr:Trabajo) WHERE tr.nombre_trabajo = '${trabajo}' RETURN usr LIMIT 25`;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const workers = result.records.map(record => {
            const worker = record.get('usr');
            return {
                nombre: worker.properties.Nombre, // Obtener el nombre del trabajo
                telefono: worker.properties.Telefono,
                municipio: worker.properties.Municipio,
                rating: worker.properties.Rating,
                apellido: worker.properties.Apellido,
                dpi: worker.properties.DPI
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
        const query = `MATCH p=(usr1:Usuario {DPI: '${dpi}'})-[:confia_en]->(usr2:Usuario) RETURN usr2 ORDER BY usr2.Rating DESC`;
        const result = await session.run(query);

        // Transformar los registros obtenidos en un arreglo de objetos JSON
        const users = result.records.map(record => {
            const user = record.get('usr2');
            return {
                nombre: user.properties.Nombre, // Obtener el nombre del trabajo
                telefono: user.properties.Telefono,
                municipio: user.properties.Municipio,
                rating: user.properties.Rating,
                apellido: user.properties.Apellido,
                dpi: user.properties.DPI
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