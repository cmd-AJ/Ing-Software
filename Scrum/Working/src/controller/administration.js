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