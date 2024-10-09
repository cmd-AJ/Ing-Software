export async function deleteJobFromAvailableWithID(hiringId: Number|string) {
    console.log("This will delete and return a hiring from the avaialable table, using its ID")
}

export async function insertHiringIntoFinishedJobs(params:Object) {
    console.log("This will take the deleted objecto from the available jobs and insert it into the  completed jobs table")    
}


export async function moveJobFromAvailableIntoComplete(jobID: Number|String) {
    console.log("This method will call the last 2 functions so its called on the front end more easily.")
}
