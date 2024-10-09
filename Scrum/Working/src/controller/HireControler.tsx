async function deleteJobFromAvailableWithID(hiringId: Number|string) {
    //This deletes and returns a hiring from the avaialable table, using its ID"

    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/contacts/hirings/delete/${hiringId}`, {
            method: 'DELETE',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
        });

        return response

    } catch (error) {
        console.error("An error occured whil trying to delete the job from available jobs ")
        throw error;
    }

}

export async function insertHiringIntoFinishedJobs(params:Object) {
    console.log("This will take the deleted objecto from the available jobs and insert it into the  completed jobs table")    
    
}


export async function moveJobFromAvailableIntoComplete(jobID: Number|string) {
    console.log("This method will call the last 2 functions so its called on the front end more easily.")
    const response = await deleteJobFromAvailableWithID(jobID)
    
    if (!response.ok){
        console.error("Could not delete job from available")
        return 
    }
}
