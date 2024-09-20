import { query, text } from 'express';
import getClient from './RelationalDatabase.js';

const client = getClient();

export async function getThreadPosts(){
    try {
        const query = {
            text: "SELECT thr.idthreads, usr.nombre || ' ' || usr.apellidos AS usuario, usr.dpi, usr.imagen AS img_usuario, thr.descripcion, post_timestamp AS posttime, thr.image AS imagen " +
                  "FROM threads thr " +
                  "JOIN usuarios usr ON (usr.dpi = thr.dpi_usuario)"
        }

        const result = await client.query(query)

        return result.rows

    } catch (error) {
        console.error('Error while gettin thread posts')
    }
}

export async function createThreadPost(usrDpi, postDescription, image) {

    try {
        const query = {
            text:"INSERT INTO threads(dpi_usuario, descripcion, post_timestamp, image) VALUES ($1, $2, CURRENT_TIMESTAMP, $3)",
            values:[usrDpi, postDescription, image],
        }

        const result = await client.query(query)

        return result

    } catch (error) {
        console.error('Error while creating thread Post')
    }
    
}

export async function createNewChat(dpi1, dpi2) {

    try {
        const query = {
            text:"INSERT INTO chats(dpireceptor, dpiemisor) VALUES ($1, $2)", 
            values:[dpi1, dpi2]
        }

        const result = await client.query(query)

        return result;
    } catch (error) {
        console.error('Error while creating chat:', error);
        throw error;
    }
    
}

export async function getUsers() {
    try {
        const query = {
            text: 'SELECT * FROM Usuarios',
        };

        const result = await client.query(query);
        return result.rows;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

// This function returns the user and its data but also the password to checkt it later.
export async function getLoginUser(dpi) {
    try {
        const query = {
            text: 'SELECT nombre, apellidos, contrasenia, email, dpi,telefono, role,departamento, municipio, imagen, sexo, fecha_nacimiento, rating, banner FROM Usuarios Where dpi = $1',
            values: [dpi]
        };

        const result = await client.query(query)
        return result.rows[0]

    } catch (error) {
        console.error('Error getting login user:', error);
        throw error;
    }
}

export async function getUserbyDPI(dpi) {
    try {
        const query = {
            text: 'SELECT nombre, apellidos, email, dpi,telefono, role,departamento, municipio, imagen, sexo, fecha_nacimiento, rating, banner FROM Usuarios Where dpi = $1',
            values: [dpi]
        };

        const result = await client.query(query)
        return result.rows

    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function insertUser(DPI, name, lastnames, password, email, phoneNumber, role, departamento, municipio) {
    try {

        const query = {
            text: `
            INSERT INTO Usuarios (
                dpi, nombre, apellidos, contrasenia, email, telefono, role, 
                sexo, fecha_nacimiento, rating, imagen, banner, 
                departamento, municipio
            ) 
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, 
                '', '', 0, 
                'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png', 
                'https://ohcbrands.com/wp-content/uploads/2018/04/69648590-header-wallpapers.jpg',
                $8, $9
            )
        `,
        values: [DPI, name, lastnames, password, email, phoneNumber, role, departamento, municipio],
        };

        const result = await client.query(query);
        console.log('Data inserted successfully');
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

export async function setsettings(municipio, imagen, sexo, fecha_nacimiento, DPI, rol, telefono, trabajo) {
    try {
        const result = await client.query(`update usuarios set municipio = '${municipio}', imagen = '${imagen}', sexo = '${sexo}',  fecha_nacimiento = '${fecha_nacimiento}', role = '${rol}', telefono = '${telefono}' where DPI = '${DPI}'`);
        console.log('Data inserted successfully')
        if (rol !== 'Empleador') {
            updatetrab(trabajo, DPI)
        }
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}



export async function gettrabajo(dpi) {
    try {
        const result = await client.query(`select nombre_trabajo  from usuarios left join trabajador on usuarios.dpi = trabajador.dpi where usuarios.dpi = '${dpi}'`
        )
        return result.rows

    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

export async function getChatID(dpi1, dpi2) {
    try {
        // search de chat id corresponding to both dpi
        const query = {
            text: "SELECT idchat " +
                "FROM chats " +
                "WHERE (dpireceptor = $1 AND dpiemisor = $2) " +
                "OR (dpireceptor = $2 AND dpiemisor = $1)",
            values: [dpi1, dpi2],
        };

        const chatID = await client.query(query)
        return chatID.rows

    } catch (error) {
        console.error('Error getting chats by user DPI:', error);
        throw error;
    }
}

export async function getChatBetweenUsers(dpi1, dpi2) {
    try {
        // search de chat id corresponding to both dpi
        const query = {
            text: "SELECT idchat " +
                "FROM chats " +
                "WHERE (dpireceptor = $1 AND dpiemisor = $2) " +
                "OR (dpireceptor = $2 AND dpiemisor = $1)",
            values: [dpi1, dpi2],
        };

        const chatID = await client.query(query)

        // Extract the id
        const chat = chatID.rows[0].idchat

        // Getting the chat messages by dpi
        const messagesQuery = {
            text: "SELECT id_chat, id_mensaje, contenido, time, dpi " +
                "FROM mensaje " +
                "WHERE id_chat = $1 " +
                "ORDER BY time ",
            values: [chat]
        }

        const result = await client.query(messagesQuery)
        return result.rows

    } catch (error) {
        console.error('Error getting chats by user DPI:', error);
        throw error;
    }
}

export async function getContactsByUserDPI(dpi) {
    try {
        const query = {
            text: "SELECT dpi, imagen AS img, nombre || ' ' || apellidos AS name " +
                "FROM usuarios " +
                "WHERE dpi IN (" +
                "    SELECT dpiemisor FROM chats AS contactos " +
                "    WHERE dpireceptor = $1 " +
                "    UNION " +
                "    SELECT dpireceptor FROM chats AS contactos " +
                "    WHERE dpiemisor = $1 " +
                ")",
            values: [dpi],
        };

        const result = await client.query(query);
        return result.rows;

    } catch (error) {
        console.error('Error getting contacts by user DPI:', error);
        throw error;
    }
}



export async function updatetrab(trabajo, dpi) {
    try {
        const result = await client.query(`UPDATE trabajador set nombre_trabajo  = '${trabajo}' where dpi = '${dpi}';`);
        console.log('Data updated  successfully')
    } catch (error) {
        console.error('Error inserting user:', error);
        throw error;
    }
}

//Trabjados en SABTE trabajador
export async function gettrabajoant(dpi) {
    try {

        const result = await client.query(`select estado, titulo, imagen from completado c 
            where dpiempleador is null
            and dpitrabajador = '${dpi}'`
        )
        return result.rows
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

//Trabajados en SABTE trabajador
export async function gettrabajoSABTE(dpi) {
    try {
        const result = await client.query(`select u.nombre , u.apellidos, dpiempleador , u.imagen  , fecha, fechafin, r.calificacion from completado c 
            left join resena r on c.idresena = r.idresena 
            join usuarios u on u.dpi = c.dpiempleador  
            where dpitrabajador = '${dpi}'
            and dpiempleador is not null;`)
        return result.rows
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
}

//Trabajadores en SABTE empleador
export async function getTrabajoSABTEemple(dpi) { 
	try {
		const result = await client.query(`select c.titulo , u.nombre , u.apellidos, dpitrabajador, t.nombre_trabajo , u.imagen  , fecha, fechafin, r.calificacion from completado c 
            left join resena r on c.idresena = r.idresena 
            join usuarios u on u.dpi = c.dpitrabajador 
            join trabajador t on t.dpi = c.dpitrabajador
            where dpiempleador = '${dpi}'
            and dpitrabajador is not null;`)
        return result.rows
	} catch (error) {
		console.error('Error in getTrabajoSABTEemple function:', error);
		throw error;
	}
}

//Estado es la descripcion eg. Se termino con aticipio o lo mejor de todo
export async function insertartrabant(dpitrabajador, dpiempleador, titulo, estado, imagen) {
	try {
	const result = await client.query(`insert into completado(estado, dpitrabajador, dpiempleador, titulo, imagen) values( '${estado}', '${dpitrabajador}','${dpiempleador}', '${titulo}', '${imagen}')`);
	console.log('Data inserted successfully');
	} catch (error) {
		console.error('Error inserting user:',error);
	}
}

export async function insertartipotrabajo(nombre_trabajo, descripcion) {
	try {
	const result = await client.query(`insert into tipotrabajo (nombre_trabajo, descripcion) values ('${nombre_trabajo}', '${descripcion}')`);
	console.log('Data inserted successfully');
	} catch (error) {
		console.log('Error inserting user:', error);
		throw error;
	}
}

export async function insertChatMessage(contenido, id_chat, dpi) { 
    try {
        const query = {
            text: "INSERT INTO mensaje(contenido, id_chat, dpi, time) VALUES( $1, $2, $3, CURRENT_TIMESTAMP)",
            values: [contenido, id_chat, dpi]
        }
        await client.query(query)
        console.log("Added message to chat")

    } catch (error) {
        console.error('Error inserting message:', error)
        throw error;
    }
}

export async function insertHiring(descripcion, dpiempleador, dpiempleado, timeStampCita, pago) {
    try {
        const query = {
            text: "INSERT INTO trabajodisponible(descripcion, dpiempleador, dpiempleado, timeStampCita, timestampcontratacion, pago) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5)",
            values: [descripcion, dpiempleador, dpiempleado, timeStampCita, pago]
        }
        await client.query(query)

    } catch (error) {
        console.error('Error while hiring', error)
        throw error;
    }
}

export async function getCurrentHirings(dpi) {
    try {
        const query = {
            text: "SELECT td.dpiempleado, u.nombre || ' ' ||u.apellidos AS trabajador, u.telefono, u.imagen AS foto, td.descripcion, td.timestampcita, td.pago AS precio " +
                  "FROM trabajodisponible td " +
                  "JOIN usuarios u ON (td.dpiempleado = u.dpi) " +
                  "WHERE td.dpiempleador = $1 ",
            values: [dpi]
        }

        const result = await client.query(query)
        return result.rows
    } catch (error) {
        console.error("Error whil getting hirings")
        throw error
    }
}


export async function updataepasscode_phone(code, dpi) {
    try {
        const query = {
            text: "update usuarios set code = $1 where  dpi = $2",
            values: [code, dpi]
        }

        const result = await client.query(query)
        return true
    } catch (error) {
        console.error("Error al actualizar el codigo con el dpi")
        throw error
    }
}



export async function getpasscode(dpi) {
    try {
        const query = {
            text: "select code from usuarios where dpi = $1",
            values: [dpi]
        }

        const result = await client.query(query)
        
        return result.rows
    } catch (error) {
        console.error("Error getting the code from dpi")
        throw error
    }
}

// verificar el codigo
export async function changepass(password ,dpi) {
    try {
        const query = {
            text: "update usuarios set password = $1 where  dpi = $2",
            values: [password, dpi]
        }

        const result = await client.query(query)
        return result.rows
    } catch (error) {
        console.error("Error getting the code from dpi")
        throw error
    }
}

