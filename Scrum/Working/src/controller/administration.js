import getClient from './RelationalDatabase.js';

const client = getClient();


export async function Admin_Exist(DPI, Password) {
    try {
        const query = {
            text: `
            select dpi, password from moderadores where dpi = $1 and password = $2
        `,
        values: [DPI, Password],
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error Looking at moderator:', error);
        throw error;
    }
}



export async function getreports() {
    try {
        const query = {
            text: `
            select idreporte, dpireportuser, dpiemisor, contenido, fecha from reporte
        `
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error Looking at moderator:', error);
        throw error;
    }
}



export async function getbanusersprev() {
    try {
        const query = {
            text: `
            select dpi, estado, unban from suspendido where estado = false limit 3
        `
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error Looking at moderator:', error);
        throw error;
    }
}


export async function getbanusers() {
    try {
        const query = {
            text: `
            select * from suspendido where estado = false 
        `
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error Looking at moderator:', error);
        throw error;
    }
}





export async function extendban(dpi, fecha) {
    try {
        const query = {
            text: `
            update suspendido set unban = $2
            where  dpi = $1
        `,values: [dpi, fecha],
        };

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Cant update the ban:', error);
        throw error;
    }
}


export async function unban(DPI) {
    try {
        const query = {
            text: `
            update suspendido set estado = true 
            where  dpi = $1
        `   ,values: [DPI],
        };
        

        const result = await client.query(query);
        return result.rows;
        
    } catch (error) {
        console.error('Error Looking at moderator:', error);
        throw error;
    }
}


