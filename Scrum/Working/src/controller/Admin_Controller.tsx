export async function Existing_admin(dpi: string, password: string) {
    try {

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/login_admin/${dpi}/${password}`,{
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        if (Array.isArray(data) && data.length != 0){
            return true;
        }
        else{
            return false
        }

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return false;
    }
}


export async function gettingreports() {
    try {

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/reports`,{
            headers: {
                'api-key': import.meta.env.VITE_ADMIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();

        return data;


    } catch (error) {
        console.error('Error fetching contacts:', error);
        return false;
    }
}




export async function Getbanusers() {
    try {

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/banprev`,{
            headers: {
                'api-key': import.meta.env.VITE_ADMIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();


        return data;


    } catch (error) {
        console.error('Error fetching contacts:', error);
        return false;
    }
}


//Todos los ussuarios el de arriba es solo los preview
export async function Getallbannedusers() {
    try {

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/banusers`,{
            headers: {
                'api-key': import.meta.env.VITE_ADMIN_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();


        return data;


    } catch (error) {
        console.error('Error fetching contacts:', error);
        return false;
    }
}


export async function unban(dpi: string) {
    try {
        const data = {
            DPI: dpi
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/unbanuser`, {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_ADMIN_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to unban user');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error while changing state:", error);
        throw error;
    }
}



export async function extendunban(dpi: string, fecha : string) {
    try {
        const data = {
            DPI: dpi,
            fecha: fecha
        };

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/extendban`, {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_ADMIN_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to extend user ban days');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error("Error while changing date:", error);
        throw error;
    }
}

