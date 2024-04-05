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

export { createUser, userExists}
