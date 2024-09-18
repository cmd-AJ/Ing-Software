
import notificationapi from 'notificationapi-node-server-sdk'

const clientid = process.env.NOTI_CLIENTID
const verif = process.env.NOTIFAPI_SC

export async function send_fg_password(number, codigo){

  try {
      // Con telefono
    notificationapi.init(
      ''+clientid, // clientId
      ''+verif// clientSecret
    )
    
    notificationapi.send({
      notificationId: 'pg_password_ph',
      user: {
        id: number,
        number: number // Replace with your phone number
      },
      mergeTags: {
        "codigo": codigo
      }
    })

  } catch (error) {

    return error
    
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
