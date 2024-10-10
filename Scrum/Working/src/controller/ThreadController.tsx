export async function getThreadPosts() {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/api/threads/getPosts`, {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get thread posts');
        }

        return response.json()

    } catch (error) {
        console.error("Error while creating getting posts:", error);
        throw error; 
    }
}

    export async function createThreadPost(user_dpi: string, post_text: string, post_Image: string) {

        //Create new chat calling the endpoint /contacts/createChat
        try {
            const data = {
                "dpiUser": user_dpi,
                "postText": post_text,
                "postImage": post_Image
            };

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/api/threads/createPost`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to create new post');
        }

        return response.json()

    } catch (error) {
        console.error("Error while creating new thread post:", error);
        throw error; 
    }

}

export async function insertCommentToThread(threadIdForComment: string, comment: string, commenterDpi: string){
    try {
        const data = {
            threadId: threadIdForComment,
            content: comment,
            senderDpi: commenterDpi,
        }

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/api/threads/insertComment`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to insert comment to thread');
        }

        return response.json()

    } catch (error) {
        console.error("Error while inserting new comment to thread:", error);
        throw error; 
    }
}

export async function getThreadComments(threadID: string) {

    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/api/threads/${threadID}`, {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get all thread comments');
        }

        return response.json()

    } catch (error) {
        console.error("Error while gettin thread comments:", error);
        throw error; 
    }
}