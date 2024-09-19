export async function createThreadPost(dpi1: string, dpi2: string) {

    const chatExists = true;

    if (!chatExists) {
        //Create new chat calling the endpoint /contacts/createChat
        try {
            const data = {
                dpi1: dpi1,
                dpi2: dpi2
            };

            const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/createChat`, {
                method: 'POST',
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to create chat');
            }
        } catch (error) {
            console.error("Error while creating chat:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    }
}
