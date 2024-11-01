
export async function getJobsList() {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/neo/WorkList`, {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
            },
        });
        const result = await response.json()

        return result
    } catch (error) {
        console.error("An error occured while getting jobs list")
        throw error;
    }
}

async function deleteJobFromAvailableWithID(hiringId: Number | string) {
    //This deletes and returns a hiring from the avaialable table, using its ID"

    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/hirings/delete/${hiringId}`, {
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

async function insertHiringIntoFinishedJobs(deletedJob: any) {


    const citaDate = new Date(deletedJob.timestampcita);

    // Format the date as dd/mm/yyyy
    const formattedDate = `${citaDate.getDate().toString().padStart(2, '0')}/${(citaDate.getMonth() + 1).toString().padStart(2, '0')}/${citaDate.getFullYear()}`;


    const data = {
        "dpitrabajador": deletedJob.dpiempleado,
        "dpiempleador": deletedJob.dpiempleador,
        "titulo": deletedJob.descripcion,
        "fecha": formattedDate,
        "pago": deletedJob.pago
    }

    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/contacts/hire/complete`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const  res = response.json()
        return res
        
    } catch (error) {
        console.error("An error occured whil adding the job as completed ")
        throw error;
   
    }

}


export async function moveJobFromAvailableIntoComplete(jobID: Number | string) {
    // console.log("This method will call the last 2 functions so its called on the front end more easily.")
    const response = await deleteJobFromAvailableWithID(jobID)

    if (!response.ok) {
        console.error("Could not delete job from available")
        return
    }

    const deletedData = await response.json(); // Await the JSON response

    const result = await insertHiringIntoFinishedJobs(deletedData)

    // console.log("This job was added to the completed table: ", result)

    return result;
}
