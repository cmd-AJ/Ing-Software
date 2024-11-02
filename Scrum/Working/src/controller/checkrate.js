import pkg from 'pg';
const { Client } = pkg;
import dotenv from 'dotenv';
import notificationapi from 'notificationapi-node-server-sdk'

dotenv.config();

const dbConfig = {
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.POSTGRES_DB,
};




export async function recievedisp() {


  const client = new Client(dbConfig);
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });

  try {
    const query = {
      text: "SELECT idtrabajo, us.nombre, usuarios.nombre ,usuarios.apellidos, us.telefono FROM trabajodisponible LEFT JOIN usuarios ON dpiempleado = dpi left join usuarios as us on us.dpi = dpiempleador WHERE timestampcita < NOW() and avisado = false"
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
  const client = new Client(dbConfig);
  client.connect()
    .then(() => {
      console.log('Connected to PostgreSQL database');
    })
    .catch((err) => {
      console.error('Error connecting to PostgreSQL database', err);
    });
  try {
    const query = {
      text: "update trabajodisponible set avisado = true where timestampcita < NOW()",
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
      '' + process.env.NOTI_CLIENTID, // clientId
      '' + process.env.NOTIFAPI_SC// clientSecret
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



async function main() {
  try {
    const result = await recievedisp(); // Call the function and await the result

    if (result != []) {
      try {
        let pasa = false
        for (const item of result) {
          if (item.telefono != '0000-0000') {
            const link = 'contratogt.com/review/' + item.idtrabajo
            const newtel = (item.telefono + '').replace('-', '')
            pasa = await send_reminder(item.nombre + ' ' + item.apellidos, link, newtel)

          }
        }
        if (pasa === true) {
          try {
            const quitar = await removcitas();
            return
          } catch (error) {
            console.error('Error eliminating trabajos disponibles', error)
          }
        }


      } catch (error) {
        console.error('Error sending sms', error)
      }
    }



  } catch (error) {
    console.error('Error executing recievedisp:', error);
  }
}



main()