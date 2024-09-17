
import notificationapi from 'notificationapi-node-server-sdk'

export async function send_fg_password(number, codigo, dpi){

  try {
      // Con telefono
    notificationapi.init(
      import.meta.env.VITE_NOTI_CLIENTID, // clientId
      import.meta.env.VITE_NOTIFAPI_SC// clientSecret
    )
    
    notificationapi.send({
      notificationId: 'pg_password_ph',
      user: {
        id: {number},
        email: '',
        number: {number} // Replace with your phone number
      },
      mergeTags: {
        "codigo": {codigo},
        "dpi": {dpi}
      }
    })

    return true

  } catch (error) {

    return error
    
  }
}

export async  function send_email_forfg(email, codigo, dpi){


  try {
  
    notificationapi.init(
      import.meta.env.VITE_NOTI_CLIENTID, // clientId
      import.meta.env.VITE_NOTIFAPI_SC// clientSecret
    )
    
    notificationapi.send({
      notificationId: 'sabte_fg_pass',
      user: {
        id: {email},
        email: {email},
      },
      mergeTags: {
        "nombre": {dpi},
        "tokenid": {codigo},
        "dpi": {dpi}
      }
    })

    return true
    
  } catch (error) {
    
    return error
}

}
