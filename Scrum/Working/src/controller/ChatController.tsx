export async function getContacts(dpi: String) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/contacts/${dpi}`);
        const data = await response.json();

        return data;

    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}