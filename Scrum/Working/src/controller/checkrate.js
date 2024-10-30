import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.POSTGRES_DB,
};


// Establishing the connection to the db
const client = new Client(dbConfig);
client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
        console.error('Error connecting to PostgreSQL database', err);
    });


export async function recievedisp() {
  try {
    const query = {
      text: "SELECT idtrabajo, us.nombre, usuarios.nombre ,usuarios.apellidos, us.telefono FROM trabajodisponible LEFT JOIN usuarios ON dpiempleado = dpi left join usuarios as us on us.dpi = dpiempleador WHERE timestampcita < NOW()"
    };

    const result = await client.query(query); // Await the result of the query

    return result.rows; // Access the rows of the result

  } catch (error) {
    console.error('Error while querying available jobs:', error);
  } finally {
    await client.end(); // Close the client connection
  }
}


export async function removcitas() {
  try {
    const query = {
      text: "delete * from trabajodisponible WHERE timestampcita < NOW()",
    }

    const result = client.query(query)

    return result

  } catch (error) {
    console.error('Error while removing citas available')
  }
}

export async function send_reminder(nombre, link, numero) {

  try {
    notificationapi.init(
      '' + clientid, // clientId
      '' + verif// clientSecret
    )

    notificationapi.send({
      notificationId: 'send_reminder',
      user: {
        id: nombre,
        email: nombre,
        number: "+502" + numero

      },
      mergeTags: {
        "nombre": nombre,
        "link": link
      }
    })

    return true

  } catch (error) {

    return false, error
  }

}


//   Hola, solo un recordatorio para completar y calificar el trabajo de {{nombre}}. Puedes hacerlo en el siguiente enlace: {{link}}.


async function main() {
  try {
    const result = await recievedisp(); // Call the function and await the result

    
    try {

      let pasa = false
      for (const item of result) {
        if (item.telefono != '0000-0000') {
          const link = 'contratogt.com/review/' + item.idtrabajo
          pasa = send_reminder(item.nombre + ' ' + item.apellidos, link, item.telefono)

        }
      }
      if (pasa === true) {
        try {
          const quitar = await removcitas();
        } catch (error) {
          console.error('Error eliminating trabajos disponibles', error)
        }
      }


    } catch (error) {
      console.error('Error sending sms', error)
    }



  } catch (error) {
    console.error('Error executing recievedisp:', error);
  }
}



main()