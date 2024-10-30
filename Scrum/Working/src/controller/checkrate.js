import getClient from './RelationalDatabase.js';

const client = getClient();

export async function recievedisp() {
    try {
        const query = {
            text: "SELECT idtrabajo, dpiempleado, timestampcita, telefono FROM trabajodisponible LEFT JOIN usuarios ON dpiempleado = dpi WHERE timestampcita < NOW()"
        };

        const result = await client.query(query); // Await the result of the query

        return result.rows; // Access the rows of the result

    } catch (error) {
        console.error('Error while querying available jobs:', error);
    } finally {
        await client.end(); // Close the client connection
    }
}

export async  function send_email_forfg(email, codigo, dpi){

    try {
      
  
      notificationapi.init(
        ''+clientid, // clientId
        ''+verif// clientSecret
      )
      
      notificationapi.send({
        notificationId: 'sabte_fg_pass',
        user: {
          id: email,
          email: email,
        },
        mergeTags: {
          "nombre": dpi,
          "tokenid": codigo,
          "dpi": dpi
        }
      })
      
    } catch (error) {
      
      return error
  }
  
  }
  

//   Hola, solo un recordatorio para completar y calificar el trabajo de {{nombre}}. Puedes hacerlo en el siguiente enlace: {{link}}.


async function main() {
    try {
        const result = await recievedisp(); // Call the function and await the result
        console.log('Query Results:', result); // Log the results to the console
    } catch (error) {
        console.error('Error executing recievedisp:', error);
    }
}



main()