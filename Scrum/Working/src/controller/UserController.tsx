import { Trabajador } from "../components/Searched/type";

export async function getUsers() {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/users`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            }
        })
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

function createUser(dpi: string, name: string, lastnames: string, password: string, email: string, phoneNumber: string, role: string, departamento: string, municipio: string) {

    const data = {
        "dpi": dpi,
        "name": name,
        "lastnames": lastnames,
        "password": password,
        "email": email,
        "phoneNumber": phoneNumber,
        "role": role,
        "departamento": departamento,
        "municipio": municipio
    }

    fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': import.meta.env.VITE_API_KEY
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            if (!response.ok) {
                console.log("There was an error on the response")
            }
            return response.json()
        })
        .then(data => {
            console.log("User Saved")
        })
        .catch(error => {
            console.log("Could not create User");
        });

        //Neo 4j post

        const NeoData = {
            "nombre": name,
            "apellidos": lastnames,
            "municipio": "",
            "rating": "",
            "imagen": "",
            "dpi": dpi,
            "telefono": phoneNumber
        }
    
        fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/usersNeo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify(NeoData)
        })
            .then(response => {
                if (!response.ok) {
                    console.log("There was an error on the response")
                }
                return response.json()
            })
            .then(NeoData => {
                console.log("Neo User Saved")
            })
            .catch(error => {
                console.log("Could not create Neo User");
            });

}

export async function getLoginUser(dpi: any, password: any) {

    const credentials = {
        "dpi": dpi,
        "password": password,
    }

    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/LoginUser`,{
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            },
            
            body: JSON.stringify(credentials)
        });

        const user = await response.json();

        return user

    } catch (error) {
        return null;
    }
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


export async function getUser(dpi: any, password: any) {
    try {
        const users = await getUsers();
        let foundUser = null;

        users.forEach((user: { id: any; password: any; }) => {
            if (user.id === dpi && user.password === password) {
                //foundUser = user;
            }
        });
        return foundUser
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}



async function getWorkersByJob(job: String) {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/workers/${job}`,{

            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            }
        });
        const data = await response.json();

        const trabajadores: Trabajador[] = data.map((worker: any) => ({
            nombre: `${worker.nombre} ${worker.apellidos}`,
            telefono: worker.telefono,
            dpi: worker.dpi,
            municipio: worker.municipio,
            rating: worker.rating,
            imagen: worker.imagen
        }));

        return trabajadores;
    } catch (error) {
        console.error('Error fetching workers:', error);
        return [];
    }
}


async function updatecuenta(municipio: string, imagen: string, sexo: string, fecha_nacimiento: string, DPI: string, rol: string, telefono: string, trabajo: string) {
    const object = {
        municipio: municipio,
        imagen: imagen,
        sexo: sexo,
        fecha_nacimiento: fecha_nacimiento,
        telefono: telefono,
        role: rol,
        DPI: DPI,
        trabajo: trabajo
    }

    const data = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/setsettings`,
        {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })

    const neoObject = {
        dpi: DPI,
        municipio: municipio,
        imagen: imagen,
        telefono: telefono,
    }

    const NeoData = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/setNeoSettings`,
        {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(neoObject)
        })
}

export { createUser, userExists, getWorkersByJob, updatecuenta }


export async function conseguirtrabajo(dpi: string) {
    try {
        const data = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/ctrabajo/${dpi}`,
            {
                method: 'GET',
                headers: {
                    'api-key': import.meta.env.VITE_API_KEY,
                    'Content-Type': 'application/json'
                }
            })
        return await data.json();
    } catch (error) {
        console.error('Error fetching trusted people:', error);
        return error;
    }

}

export async function getTrustedPeople(dpi: string): Promise<any[]> {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trustNetwork/${dpi}`, {
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching trusted people:', error);
        return [];
    }
}

export async function addTrustedPeople(userDpi: string, newtrusteduserDpi: string): Promise<any[]> {
    try {

        const Object = {
            dp1: userDpi,
            dpi2: newtrusteduserDpi
        }

        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trustNetwork/addTrust`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object)
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding trusted people:', error);
        return [];
    }
}

export async function configurartrabajo(trabajo: string, dpi: string) {
    const object = {
        trabajo: trabajo,
        dpi: dpi
    }

    const data = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/confitrab`,
        {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
    return data
}



export async function gettrabajoanterior(dpi: string) {

    const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trabajoanterior/${dpi}`,
        {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        })
    const data = await response.json()

    return data
}

//DPI y Estado (Descripcion)
export async function insertrabajoanterior(trabajo: object) {

    const data = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trabajaoanterior/`,
        {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trabajo)
        })
    return data
}

export async function getContratEmployer(dpi : string) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trabajoanteriorSABTEemploy/${dpi}`,
        {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        }
    )
    const data = await response.json()

    return data
}

export async function getContratWorker(dpi : string) {
    const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/trabajoanteriorSABTE/${dpi}`,
        {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        }
    )

    const data = await response.json()

    return data
}



export async function insertartipodetrabajo(trabajo: object) {

    const data = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/instipotrabajo/`,
        {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trabajo)
        })
    return data
}

export async function getUser2(dpi: string) {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/users/${dpi}`, {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.status} ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error fetching user by DPI:', error);
        throw error;
    }
}

export async function getUserName(dpi: string) {
    try {
        const response = await fetch(`http://${import.meta.env.VITE_API_HOSTI}:${import.meta.env.VITE_PORTI}/users/${dpi}`, {
            method: 'GET',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            }
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error fetching user: ${response.status} ${response.statusText}`);
        }

        // Parsear la respuesta JSON
        const userData = await response.json();
        const names = userData[0].nombre.split(' ')
        const lastnames = userData[0].apellidos.split(' ')
        return names[0] + ' ' + lastnames[0]
    } catch (error) {
        console.error('Error fetching user by DPI:', error);
        throw error;
    }
}
