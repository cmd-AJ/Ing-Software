
import notificationapi from 'notificationapi-node-server-sdk'

export async function send_fg_password(number, codigo){

  try {
      // Con telefono
    console.log(import.meta.env.NOTI_CLIENTID)
    notificationapi.init(
      import.meta.env.NOTI_CLIENTID+'', // clientId
      import.meta.env.NOTIFAPI_SC+''// clientSecret
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
      import.meta.env.NOTI_CLIENTID+'', // clientId
      import.meta.env.NOTIFAPI_SC+''// clientSecret
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
