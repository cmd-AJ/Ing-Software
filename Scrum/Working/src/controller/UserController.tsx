import { Trabajador } from "../components/Searched/type";

async function getUsers() {
    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

function createUser(dpi: String, name: String, lastnames: String, password: String, email: String, phoneNumber: String, role: String) {
    const data = {
        "dpi": dpi,
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
            if (!response.ok) {
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
            telefono: worker.telefono,
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


async function setSettings(userData: any) {
    try {
        const data = await fetch(`http://127.0.0.1:3000/setSettings`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
    } catch (error) {
        console.error('Error modifying user:', error)
    }
}

export { createUser, userExists, getWorkersByJob, setSettings }

export async function updatecuenta(municipio: string, imagen: string, sexo: string, fecha_nacimiento: string, rating: string, numero: string, DPI: string) {
    const object = {
        municipio: municipio,
        imagen: imagen,
        sexo: sexo,
        fecha_nacimiento: fecha_nacimiento,
        rating: rating,
        numero: numero,
        DPI: DPI
    }

    const data = await fetch('http://127.0.0.1:3000/setsettings',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })
}

export async function conseguirtrabajo(dpi: string) {

    const data = await fetch(`http://127.0.0.1:3000/ctrabajo/${dpi}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    return data
}

export async function getTrustedPeople(dpi: string): Promise<any[]> {
    try {
      const response = await fetch(`http://127.0.0.1:3000/trustNetwork/${dpi}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching trusted people:', error);
      return [];
    }
  }
  