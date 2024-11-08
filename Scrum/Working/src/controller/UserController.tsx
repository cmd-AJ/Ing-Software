import { Departamentos } from "../Departamentos/Departamentos";

export async function addJobToWorker(dpi: string, job: string) {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/neo/AddJobToWorker`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify({ dpi, job })
        });

        if (!response.ok) {
            throw new Error("Failed to add job to user");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error while adding job to worker:", error);
        return null;
    }
}

export async function getJobsWithDpi(dpi:string) {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/neo/WorkerJobList/${dpi}`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            }
        });

        const result = await response.json() 
        return result

    } catch (error) {
        console.error("Error while getting user jobs", error)
        return null;
    }   
}

async function createUser(
	dpi: string, 
	name: string, 
	lastnames: string, 
	password: string, 
	email: string, 
	phoneNumber: string, 
	role: string, 
	departamento: 
	string, 
	municipio: string, 
) {
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

    try {
	const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/users`, {
        	method: 'POST',
        	headers: {
            		'Content-Type': 'application/json',
            		'api-key': import.meta.env.VITE_API_KEY
        	},
        	body: JSON.stringify(data)
	})
    
    	if (!response.ok) {
		console.log("There was an error on the response")
    		return false 
    	}

	console.log("User saved");
	
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
    
        const neoResponse = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/usersNeo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            },
            body: JSON.stringify(NeoData)
        })

	if (!neoResponse.ok) {
		console.log("There was an error on the Neo4j response")
		return false
	}

	console.log("Neo User Saved");
	return true
    } catch (error) {
	console.log("Could not create User or Neo User");
	return false
    }

}

export async function getLoginUser(dpi: any, password: any) {

    const credentials = {
        "dpi": dpi,
        "password": password,
    }

    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/LoginUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            },
            
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            return null;
        }

        const user = await response.json();

        return user

    } catch (error) {
        console.error("Error while getting login user", error)
        return null;
    }
}

async function userExists(dpi: String, password: String) {
    try {
        const user = await getLoginUser(dpi, password);

        if(user){
            return true;
        } else {
            return false;
        }
             
        } catch (error) {

            console.error('Error checking if user exists:', error);
            return false;
    }
}

function countSharedContacts(userContacts: any[], workerContacts: any[]): number {
    const userDpiSet = new Set(userContacts.map(contact => contact.dpi));
    const sharedContacts = workerContacts.filter(contact => userDpiSet.has(contact.dpi));
    return sharedContacts.length;
}


async function getWorkersByJob(job: String, usrDpi: string) {
    try {
        // Obtain the trusted people of the user
        const usrTrustedpeople = await getTrustedPeople(usrDpi);

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/workers/${job}`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            }
        });

        const data = await response.json();

        // For each worker, find their trusted people and calculate shared contacts
        const trabajadores = await Promise.all(data.map(async (worker: any) => {
            const workerTrustedpeople = await getTrustedPeople(worker.dpi);
            const sharedContacts = countSharedContacts(usrTrustedpeople, workerTrustedpeople);

            // Get the departamento using the worker's DPI
            const departamento = Departamentos(worker.dpi);

            return {
                nombre: `${worker.nombre} ${worker.apellidos}`,
                telefono: worker.telefono,
                dpi: worker.dpi,
                rating: worker.rating,
                imagen: worker.imagen,
                trabajo: worker.nombre_trabajo,
                contactos_en_comun: sharedContacts,
                municipio: worker.municipio,
                direccion: `${departamento}, ${worker.municipio}`
            };
        }));

        return trabajadores;
    } catch (error) {
        console.error('Error fetching workers:', error);
        return [];
    }
}

async function getWorkersByName(name: String, usrDpi: string) {
    try {
        // Obtain the trusted people of the user
        const usrTrustedpeople = await getTrustedPeople(usrDpi);

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/nameSearch/${name}`, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': import.meta.env.VITE_API_KEY
            }
        });

        const data = await response.json();

        // For each worker, find their trusted people and calculate shared contacts
        const trabajadores = await Promise.all(data.map(async (worker: any) => {
            const workerTrustedpeople = await getTrustedPeople(worker.dpi);
            const sharedContacts = countSharedContacts(usrTrustedpeople, workerTrustedpeople);

            // Get the departamento using the worker's DPI
            const departamento = Departamentos(worker.dpi);

            return {
                nombre: `${worker.nombre} ${worker.apellidos}`,
                telefono: worker.telefono,
                dpi: worker.dpi,
                rating: worker.rating,
                imagen: worker.imagen,
                trabajo: worker.nombre_trabajo,
                contactos_en_comun: sharedContacts,
                municipio: worker.municipio,
                direccion: `${departamento}, ${worker.municipio}`
            };
        }));

        return trabajadores;
    } catch (error) {
        console.error('Error fetching workers:', error);
        return [];
    }
}



async function updatecuenta(municipio: string, imagen: string, sexo: string, fecha_nacimiento: string, DPI: string, rol: string, telefono: string, trabajo: string, banner: string) {
    const object = {
        municipio: municipio,
        imagen: imagen,
        sexo: sexo,
        fecha_nacimiento: fecha_nacimiento,
        telefono: telefono,
        role: rol,
        DPI: DPI,
        trabajo: trabajo,
        banner: banner
    }

    await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/setsettings`,
        {
            method: 'PUT',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(object)
        })

}

export async function updatecuentaNEO4J(municipio: string, imagen: string, DPI: string, telefono: string) {


    const neoObject = {
        dpi: DPI,
        municipio: municipio,
        imagen: imagen,
        telefono: telefono,
    }

    await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/setNeoSettings`,
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
        const data = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/ctrabajo/${dpi}`,
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
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trustNetwork/${dpi}`, {
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
            dpi1: userDpi,
            dpi2: newtrusteduserDpi
        }

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trustNetwork/addTrust`, {
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

    const data = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/confitrab`,
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

    const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trabajoanterior/${dpi}`,
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
export async function insertrabajoanterior(dpiTrabajador: string, titulo: string, estado: string, imagen: string) {

    const trabajo = {
        dpiTrabajador: dpiTrabajador,
        titulo: titulo,
        estado: estado,
        imagen: imagen
    }

    const data = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trabajaoanterior/`,
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
    const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trabajoanteriorSABTEemploy/${dpi}`,
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
    const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/trabajoanteriorSABTE/${dpi}`,
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

    const data = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/instipotrabajo/`,
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
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/users/${dpi}`, {
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
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/users/${dpi}`, {
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


export async function sendSatisfactionSurvey(jobId: Number, rating: Number, dpi_worker: string, description?: string) {
    try {

        const survey_data = {
            idtrabajo: jobId,
            calificacion: rating,
            dpi_trabajador: dpi_worker,
            descripcion: description
        }

        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/survey`, {
            method: 'POST',
            headers: {
                'api-key': import.meta.env.VITE_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(survey_data)
        });

        // Verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error(`Error while sending survey`);
        }

    } catch (error) {
        console.error('Error sending satisfaction survey:', error);
        throw error;
    }
}


export async function get_contrat_by_moventh(dpi: string, mes: string) {
    try {
        const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/getcontrat_bymonth/${dpi}/${mes}`, {
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
        return userData
    } catch (error) {
        console.error('Error fetching user by DPI:', error);
        throw error;
    }
}

export async function getDpiByTrabajo(idtrabajo : string) {
    try {
      const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/threads/getDpiByTrabajo/${idtrabajo}`, {
        method: 'GET',
        headers: {
          'api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to get DPI for the given idtrabajo');
      }
  
      return response.json();
    } catch (error) {
      console.error('Error fetching DPI by idtrabajo:', error);
      throw error;
    }
  }
  
export async function setWorking(dpi : string) {
	const data = {
		dpi: dpi
	}
	try {
		const response = await fetch(`https://${import.meta.env.VITE_API_HOSTI}/api/setWorking/`, {
        method: 'PUT',
        headers: {
          'api-key': import.meta.env.VITE_API_KEY,
          'Content-Type': 'application/json',
        },
	body: JSON.stringify(data)
	})

	if (!response.ok) {
		throw new Error('Failed to update isWorking for the dpi')
	}

	} catch (error) {
		console.error('Error updating isWorking by dpi:', error);
		throw error;
	}
}
