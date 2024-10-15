
import express from 'express'
import cors from 'cors'
import { apiKeyAuth, adminapiKeyAuth } from './auth.js'
import { insertJobToCompleted, deleteHiringFromAvailable, insertSurveyToCompletedJob, insertCommentWithId, getCommentsWithThreadID, getThreadPosts, createThreadPost, createNewChat, getUsers, getLoginUser, insertUser, gettrabajo, getUserbyDPI, setsettings, getContactsByUserDPI, getChatBetweenUsers, updatetrab, gettrabajoant, insertartrabant, insertartipotrabajo, gettrabajoSABTE, getTrabajoSABTEemple, insertChatMessage, getChatID, insertHiring, getCurrentHirings, getpasscode, updataepasscode_phone, getmail, getphone, changepass, getreport_nofecha, getreport_withfecha, getcontrataciones_por_mes } from './db.js'
import { getWorkers, getTrustedUsersByDpi, creatNeoUser, updateNeoUser, addUserAsTrustedPerson } from './neo.js'
import { Admin_Exist, extendban, getbanusers, getbanusersprev, getreports, unban } from './administration.js';
import { send_email_forfg, send_fg_password } from './fg_function.js'
import { getImageFromDrive, updatePhoto, uploadFile } from './gdrive.js'

import fs from 'fs'


function imageToBase64(imagePath) {
  // Ensure the image path is absolute
  const absolutePath = imagePath

  // Read the image file
  fs.readFile(absolutePath, (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    // Convert the buffer to Base64
    const base64Image = data.toString('base64');

    // Optional: Determine the MIME type based on the file extension

    const extension = imagePath.split('.').pop().toLowerCase();
    let mimeType;
    if (extension === 'png') {
      mimeType = 'image/png';
    } else if (extension === 'jpg' || extension === 'jpeg') {
      mimeType = 'image/jpeg';
    } else if (extension === 'gif') {
      mimeType = 'image/gif';
    } else {
      mimeType = 'application/octet-stream'; // Default for unsupported types
    }


    // Format the Base64 string with the data URL prefix
    const base64String = `data:${mimeType};base64,${base64Image}`;

    return base64String

  });
}




const app = express()
const port = 3000


app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'api-key'],
}))



app.get('/api/', (req, res) => {
  res.send('Trying the API in order to know if it works or not')
})

app.get('/api/test', apiKeyAuth, async (req, res) => {
  try {
    res.send('Auth works')

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.get('/api/users', apiKeyAuth, async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

// apiKeyAuth,
app.get('/api/login_admin/:dpi/:password', apiKeyAuth, async (req, res) => {
  try {
    const { dpi, password } = req.params
    const users = await Admin_Exist(dpi, password)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/reports', adminapiKeyAuth, async (req, res) => {
  try {
    const users = await getreports()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/banprev', adminapiKeyAuth, async (req, res) => {
  try {
    const users = await getbanusersprev()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.get('/api/banusers', adminapiKeyAuth, async (req, res) => {
  try {
    const users = await getbanusers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.put('/api/extendban', adminapiKeyAuth, async (req, res) => {
  const { DPI, fecha } = req.body;
  try {
    const users = await extendban(DPI, fecha)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})


app.put('/api/unbanuser', adminapiKeyAuth, async (req, res) => {
  const { DPI } = req.body;
  try {
    const users = await unban(DPI)
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})




app.post('/api/LoginUser', apiKeyAuth, async (req, res) => {
  try {
    const { dpi, password } = req.body;

    const user = await getLoginUser(dpi);

    if (user) {

      if (password === user.contrasenia) {
        return res.status(200).json(user);
      } else {
        return res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/api/users', apiKeyAuth, async (req, res) => {
  try {
    const {
      dpi, name, lastnames, password, email, phoneNumber, role, departamento, municipio
    } = req.body

    const imagen = imageToBase64("banner.jpg")

    const ban = imageToBase64("blankpf.jpg")

    const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const banner = await uploadFile(randoms + '.jpg', ban)

    const imagens = await uploadFile((randoms - 1) + '.jpg', imagen)



    const result = await insertUser(dpi, name, lastnames, password, email, phoneNumber, role, departamento, municipio, imagens, banner)
    res.status(200).json({ Succes: 'User inserted' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/usersNeo', apiKeyAuth, async (req, res) => {
  try {
    const {
      nombre, apellidos, municipio, rating, imagen, dpi, telefono
    } = req.body
    const result = await creatNeoUser(nombre, apellidos, municipio, rating, imagen, dpi, telefono)

    res.status(200).json({ Succes: 'Neo User inserted' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/users/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params
    const user = await getUserbyDPI(dpi)

    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/workers/:job', apiKeyAuth, async (req, res) => {
  try {
    const { job } = req.params
    const workers = await getWorkers(job);
    res.status(200).json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`)
})

//prince
app.put('/api/setsettings', apiKeyAuth, async (req, res) => {
  const { municipio, imagen, sexo, fecha_nacimiento, DPI, role, telefono, trabajo, banner } = req.body;
  if (!municipio || !imagen || !sexo || !fecha_nacimiento || !DPI || !role || !telefono || !trabajo || !banner) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' });
  } else {

    try {
      await setsettings(municipio, imagen, sexo, fecha_nacimiento, DPI, role, telefono, trabajo, banner);
      res.send('Inserted successfully');
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});

app.put('/api/setNeoSettings', apiKeyAuth, async (req, res) => {
  const { dpi, municipio, imagen, telefono } = req.body;
  if (!dpi || !municipio || !imagen || !telefono) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' });
  } else {
    try {
      await updateNeoUser(dpi, municipio, imagen, telefono);
      res.send('Updated successfully');
    } catch (error) {
      console.error('Error inserting user:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
});


app.get('/api/ctrabajo/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params
    const user = await gettrabajo(dpi)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/contacts/:dpi', async (req, res) => {
  try {
    const { dpi } = req.params;
    const contacts = await getContactsByUserDPI(dpi);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/trustNetwork/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params;
    const trustedUsers = await getTrustedUsersByDpi(dpi)
    res.status(200).json(trustedUsers);

  } catch (error) {
    console.error('Error getting trusted Users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/api/contacts/createChat', apiKeyAuth, async (req, res) => {
  try {
    const { dpi1, dpi2 } = req.body;

    // Validación de entrada
    if (!dpi1 || !dpi2) {
      return res.status(400).json({ error: 'dpi1 and dpi2 are required' });
    }

    // Intentar crear o recuperar el chat entre los usuarios
    const chat = await createNewChat(dpi1, dpi2);

    if (chat) {
      return res.status(200).json({ success: "Successfully created new chat" });
    } else {
      return res.status(400).json({ error: "Chat creation failed or already exists" });
    }

  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/contacts/messages', apiKeyAuth, async (req, res) => {
  try {
    const { dpi1, dpi2 } = req.body;
    const chatMessagges = await getChatBetweenUsers(dpi1, dpi2)
    res.status(200).json(chatMessagges);

  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})




app.post('/api/sendforgot_phone', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.body;
    const codigo = (Math.random() + 1).toString(36).substring(8, 12);
    const changepas = await updataepasscode_phone(codigo, dpi)
    const telefono = await getphone(dpi)
    const new_phone = (('+502' + telefono[0].telefono).replace('-', '')).toString()


    if (changepas) {
      const forgotPhone = await send_fg_password(new_phone, codigo)
      res.status(200).json('response:message sended');
    } else {
      res.status(400).json('response:Unable to change code');
    }

  } catch (error) {
    console.error('Error trying to send a code to phone:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.get('/api/getcode/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params
    const user = await getpasscode(dpi)
    if (user) {
      res.status(200).send(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.put('/api/codechange', apiKeyAuth, async (req, res) => {
  const [password, dpi] = [req.body.password, req.body.dpi]
  if (!password || !dpi) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
  } else {
    try {
      const resp = await changepass(password, dpi)
      res.send('Updated succesfully')
    } catch (error) {
      throw error
    }
  }
})



app.post('/api/sendforgot_mail', apiKeyAuth, async (req, res) => {
  try {
    const { nombre } = req.body;
    const codigo = (Math.random() + 1).toString(36).substring(8, 12);

    const changepas = await updataepasscode_phone(codigo, nombre)

    const email = await getmail(nombre)

    if (changepas) {
      const forgotmail = await send_email_forfg(email[0].email, codigo, nombre)
      res.status(200).json('response:message sended');
    } else {
      res.status(400).json('response:Unable to change code');
    }


    res.status(200).json('response:message sended');


  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})





app.put('/api/confitrab', apiKeyAuth, async (req, res) => {
  const [dpi, trabajo] = [req.body.dpi, req.body.trabajo]
  if (!trabajo || !dpi) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
  } else {
    try {
      const resp = await updatetrab(trabajo, dpi)
      res.send('Updated succesfully')
    } catch (error) {
      throw error
    }
  }
})

app.get('/api/trabajoanterior/:dpi', apiKeyAuth, async (req, res) => {
  //Tomar nota el dpi es del trabajador osea el que esta haciendo el trabajo 
  try {
    const { dpi } = req.params;
    const trabjant = await gettrabajoant(dpi)
    res.status(200).json(trabjant);

  } catch (error) {
    console.error('Error getting trabajos anteriores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/api/trabajoanteriorSABTE/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params;
    const trabjant = await gettrabajoSABTE(dpi)
    res.status(200).json(trabjant);

  } catch (error) {
    console.error('Error getting trabajos anteriores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.get('/api/trabajoanteriorSABTEemploy/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params;
    if (!dpi) {
      return res.status(400).json({ error: 'DPI parameter is required' });
    }
    const trabjant = await getTrabajoSABTEemple(dpi);
    res.status(200).json(trabjant);
  } catch (error) {
    console.error('Error getting trabajos anteriores:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//prince
app.post('/api/trabajaoanterior', apiKeyAuth, async (req, res) => {
  try {
    const [dpitrabajador, dpiempleador, titulo, estado, imagen] = [req.body.dpitrabajador, req.body.dpiempleador, req.body.titulo, req.body.estado, req.body.imagen]

    const parts = imagen.split(/[;/]+/);
    const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const respuesta = await uploadFile(randoms + '.' + parts[1], imagen)


    const result = await insertartrabant(dpitrabajador, dpiempleador, titulo, estado, 'https://contratogt.com/api/image/' + respuesta)
    res.status(200).json({ Succes: 'Trabajo anterior se inserto' })
  } catch (error) {
  }
})


app.post('/api/instipotrabajo', apiKeyAuth, async (req, res) => {
  try {
    const [nombre_trabajo, descripcion] = [req.body.nombre_trabajo, req.body.descripcion]
    const result = await insertartipotrabajo(nombre_trabajo, descripcion)
    res.status(200).json({ Succes: 'Trabajo anterior se inserto' })
  } catch (error) {
  }
})

app.post('/api/contacts/message', apiKeyAuth, async (req, res) => {
  try {
    const { contenido, id_chat, dpi } = req.body;
    await insertChatMessage(contenido, id_chat, dpi)
    res.status(200).json({ Succes: 'Mensaje insertado' })
  } catch (error) {
    console.error('Error posting message:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
// Endpoint to getChatID
app.post('/api/contacts/chatID', apiKeyAuth, async (req, res) => {
  try {
    const { dpi1, dpi2 } = req.body;
    const chatMessagges = await getChatID(dpi1, dpi2)
    res.status(200).json(chatMessagges);

  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/api/contacts/hire', apiKeyAuth, async (req, res) => {
  try {
    const { descripcion, dpiempleador, dpiempleado, timeStampCita, pago } = req.body;
    await insertHiring(descripcion, dpiempleador, dpiempleado, timeStampCita, pago)
    res.status(200).json({ Success: 'Contrato realizado' })
  } catch (error) {
    console.error('Error while hiring person:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/contacts/hirings/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { dpi } = req.params;
    const hirings = await getCurrentHirings(dpi)
    res.status(200).json(hirings)
  } catch (error) {
    console.error("Error while getting hirings:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/trustNetwork/addTrust', apiKeyAuth, async (req, res) => {
  try {
    const { dpi1, dpi2 } = req.body;
    await addUserAsTrustedPerson(dpi1, dpi2)
    res.status(200).json({ Success: 'Trusted person was added' })
  } catch (error) {
    console.error('Trusted person could not be added:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//prince
app.post('/api/threads/createPost', apiKeyAuth, async (req, res) => {
  try {
    const { dpiUser, postText, postImage } = req.body;

    // Validación de entrada
    if (!dpiUser || !postText) {
      return res.status(400).json({ error: 'Failed to creat post, empty values are not allowed' });
    }


    const parts = postImage.split(/[;/]+/);
    const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const respuesta = await uploadFile(randoms + '.' + parts[1], postImage)

    // Creating new threadpost
    const post = await createThreadPost(dpiUser, postText, 'https://contratogt.com/api/image/' + respuesta);

    if (post) {
      return res.status(200).json({ success: "Successfully created new post" });
    } else {
      return res.status(400).json({ error: "Falied to create post" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/threads/getPosts', apiKeyAuth, async (req, res) => {
  try {
    const posts = await getThreadPosts()

    if (posts) {
      res.status(200).json(posts)
    } else {
      res.status(400).json({ error: "Falied to retrieve posts" });
    }

  } catch (error) {
    console.error("Error while getting thread posts:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/threads/:threadId/', apiKeyAuth, async (req, res) => {
  try {
    const { threadId } = req.params
    const comments = await getCommentsWithThreadID(threadId)

    if (comments) {
      res.status(200).json(comments)
    } else {
      res.status(400).json({ error: "Falied to retrieve comments with ID" });
    }

  } catch (error) {
    console.error("Error while getting thread comments:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



app.get('/api/getuserreport/:idreporte/:dpi', apiKeyAuth, async (req, res) => {
  try {
    const { idreporte, dpi } = req.params
    const reportex = await getreport_nofecha(dpi, idreporte)

    if (reportex) {
      res.status(200).json(reportex)
    } else {
      res.status(400).json({ error: "Falied to retrieve users with no fecha" });
    }
  } catch (error) {
    console.error("Error while getting thread comments:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



app.get('/api/getuserreport/:idreporte/:dpi/:fechai/:fechaf', apiKeyAuth, async (req, res) => {
  try {
    const { idreporte, dpi, fechai, fechaf } = req.params
    const reportex = await getreport_withfecha(fechai, fechaf, dpi, idreporte)

    if (reportex) {
      res.status(200).json(reportex)
    } else {
      res.status(400).json({ error: "Falied to get users from reports" });
    }

  } catch (error) {
    console.error("Error while getting thread comments:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/getcontrat_bymonth/:dpi/:mes', apiKeyAuth, async (req, res) => {
  try {
    const { dpi, mes } = req.params
    const reportex = await getcontrataciones_por_mes(dpi, mes)
    if (reportex) {
      res.status(200).json(reportex)
    } else {
      res.status(400).json({ error: "Falied to get users from reports" });
    }

  } catch (error) {
    console.error("Error while getting contratos by month:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



app.post('/api/threads/insertComment', apiKeyAuth, async (req, res) => {
  try {
    const { threadId, content, senderDpi } = req.body;

    // Validación de entrada
    if (!threadId || !content || !senderDpi) {
      return res.status(400).json({ error: 'Failed to insert comment to thread, empty values are not allowed' });
    }

    // Creating new threadpost
    const response = await insertCommentWithId(threadId, content, senderDpi);

    if (response) {
      return res.status(200).json({ success: "Successfully created new thread comment" });
    } else {
      return res.status(400).json({ error: "Falied to create thread comment" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/survey', apiKeyAuth, async (req, res) => {
  try {
    const { idtrabajo, calificacion, dpi_trabajador, descripcion } = req.body;

    // Basic validation
    if (!idtrabajo || !calificacion || !dpi_trabajador) {
      return res.status(400).json({ error: "Missing required fields. 'idtrabajo', 'calificacion', 'dpi_trabajador', are required." });
    }

    // Proceed with survey creation
    const response = await insertSurveyToCompletedJob(idtrabajo, calificacion, descripcion, dpi_trabajador);

    if (response) {
      return res.status(200).json({ success: "Successfully created new survey for job" });
    } else {
      return res.status(400).json({ error: "Failed to create survey for job" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/contacts/hirings/delete/:hiringID', apiKeyAuth, async (req, res) => {
  try {
    const { hiringID } = req.params;
    const deletedHiring = await deleteHiringFromAvailable(hiringID)

    if (deletedHiring.rows.length === 0) {
      return res.status(404).json({ error: 'hiring not found' })
    }

    return res.status(200).json(deletedHiring.rows[0])

  } catch (error) {
    console.error("Error while getting hirings:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})



app.post('/api/contacts/hire/complete', apiKeyAuth, async (req, res) => {
  try {
    const { dpitrabajador, dpiempleador, titulo, fecha, pago } = req.body;

    const insertedObject = await insertJobToCompleted(dpitrabajador, dpiempleador, titulo, fecha, pago)

    if (insertedObject.rows.length === 0) {
      return res.status(400).json({ error: "Failed to mark job as competed" });
    }

    return res.status(200).json(insertedObject.rows[0])

  } catch (error) {
    console.error('Error while marking job as completed:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/api/threads/getDpiByTrabajo/:idtrabajo', apiKeyAuth, async (req, res) => {
  try {
    const { idtrabajo } = req.params;
    const dpi = await getDpiByTrabajo(idtrabajo);
    if (dpi) {
      res.status(200).json(dpi);
    } else {
      res.status(400).json({ error: "Failed to retrieve DPI for the given idtrabajo" });
    }

  } catch (error) {
    console.error("Error while getting DPI by idtrabajo:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/image/:fileID', apiKeyAuth, async (req, res) => {
  const { fileID } = req.params;
  if (!fileID) {
    return res.status(400).send('File ID is required');
  }

  try {
    const imageStream = await getImageFromDrive(fileID);
    res.set('Content-Type', 'image/jpeg');
    imageStream.pipe(res);
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).send('Error fetching image');
  }
});




app.post('/api/insertimage/', async (req, res) => {
  try {
    const { imagename, base64code } = req.body;

    if (!imagename || !base64code) {
      return res.status(400).json({ error: 'Failed to insert comment to thread, empty values are not allowed' });
    }

    const response = await uploadFile(imagename, base64code);

    if (response) {
      return res.status(200).json({ success: "Successfully inserted an image to ggdrive " + response });
    } else {
      return res.status(400).json({ error: "Falied to create thread comment" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

