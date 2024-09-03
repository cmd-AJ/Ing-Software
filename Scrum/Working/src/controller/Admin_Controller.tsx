export async function Existing_admin(dpi: string, password: string) {
    try {

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/login_admin/${dpi}/${password}`,{
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

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/reports`,{
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

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/banprev`,{
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