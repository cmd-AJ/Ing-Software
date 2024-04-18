import { Trabajador } from "../components/Searched/type";

async function getUsers(){
    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

function createUser(dpi: String, name: String, lastnames: String, password: String, email: String, phoneNumber: String, role: String){
    const data = {
        "dpi": dpi ,
        "name": name,
        "lastnames": lastnames,
        "password": password,
        "email": email,
        "phoneNumber": phoneNumber,
        "role": role
    }

    fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok){
            console.log("There was an error on the response")
        }
        console.log(response.json())
        return response.json()
    })
    .then(data => {
        console.log("User Saved")
    })
    .catch(error => {
        console.log("Could not create User");
    });
    
}

async function userExists(dpi: String, password: String) {
    try {
        const users = await getUsers();
        
        return users.some((user: { dpi: String; contrasenia: String; }) => user.dpi === dpi && user.contrasenia === password);
    } catch (error) {
        console.error('Error checking if user exists:', error);
        return false;
    }
}


async function getUser(dpi: any, password: any) {
    try {
        const users = await getUsers();
        return users.find((user: { id: any; password: any; }) => user.id === dpi && user.password === password);
    } catch (error) {
        console.error('Error getting user:', error);
        return null; 
    }
}

async function getWorkersByJob(job: String) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/workers/${job}`);
        const data = await response.json();

        const trabajadores: Trabajador[] = data.map((worker: any) => ({
            nombre: `${worker.nombre} ${worker.apellido}`,
            dpi: worker.dpi,
            municipio: worker.municipio,
            rating: worker.rating,
        }));

        return trabajadores;
    } catch (error) {
        console.error('Error fetching workers:', error);
        return [];
    }
}

export { createUser, userExists, getWorkersByJob}
