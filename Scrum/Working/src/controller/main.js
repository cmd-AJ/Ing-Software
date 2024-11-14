
import express from 'express'
import cors from 'cors'
import { apiKeyAuth, adminapiKeyAuth } from './auth.js'
import { insertJobToCompleted, deleteHiringFromAvailable, insertSurveyToCompletedJob, insertCommentWithId, getCommentsWithThreadID, getThreadPosts, createThreadPost, createNewChat, getUsers, getLoginUser, insertUser, gettrabajo, getUserbyDPI, setsettings, getContactsByUserDPI, getChatBetweenUsers, updatetrab, gettrabajoant, insertartrabant, insertartipotrabajo, gettrabajoSABTE, getTrabajoSABTEemple, insertChatMessage, getChatID, insertHiring, getCurrentHirings, getpasscode, updataepasscode_phone, getmail, getphone, changepass, getreport_nofecha, getreport_withfecha, getcontrataciones_por_mes, setWorkingState ,getreviewone, setnewtrabajoperfil, removenew_trabajo, chworkdescription, gettrabajos, setHiringState } from './db.js'
import { deleteRelationUserTojob, addRelationUserToJob, getJobsOfWorkerWithDPI,getWorkers, getTrustedUsersByDpi, creatNeoUser, updateNeoUser, addUserAsTrustedPerson, getAllTrabajos, insertNewJob, getWorkersByFlexibleName } from './neo.js'
import { Admin_Exist, extendban, getbanusers, getbanusersprev, getreports, unban } from './administration.js';
import { send_email_forfg, send_fg_password } from './fg_function.js'
import { getImageFromDrive, updatePhoto, uploadFile } from './gdrive.js'


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

app.get('/api/nameSearch/:name', apiKeyAuth, async (req, res) => {
  try {
    const { name } = req.params
    const workers = await getWorkersByFlexibleName(name);
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

app.get('/api/neo/WorkList', apiKeyAuth, async (req, res) => {
  try {
      // Fetch all trabajos from Neo4j
      const trabajos = await getAllTrabajos();

      // Send the trabajos as the response
      res.status(200).json(trabajos);

  } catch (error) {
      console.error('Error fetching trabajos:', error);

      // Send an error response
      res.status(500).json({ message: 'Error fetching trabajos' });
  }
});

app.get('/api/neo/WorkerJobList/:dpi', apiKeyAuth, async (req, res) => {
  try {

      const { dpi } = req.params
      const trabajos = await getJobsOfWorkerWithDPI(dpi);

      if(trabajos){
        // Send the trabajos as the response
        res.status(200).json(trabajos);

      } else {
        res.status(404).json({ error: 'Could not get trabajos' })
      }

  } catch (error) {
      console.error('Error fetching trabajos:', error);

      // Send an error response
      res.status(500).json({ message: 'Error fetching trabajos' });
  }
});

app.post('/api/neo/addJob', apiKeyAuth, async (req, res) => {
  try {
    const { job, description } = req.body

    if (!job || !description){
      res.status(400).json({error: 'All values are required'})
    }

    const result = await insertNewJob(job, description)

    if (result){
      res.status(200).json({Succes: 'Job inserted'})
    } else {
      res.status(404).json({error: 'Could not add new job'})
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/api/neo/AddJobToWorker', apiKeyAuth, async (req, res) => {
  try {
    const { dpi, job } = req.body;

    if (!dpi || !job) {
      return res.status(400).json({ error: 'Both DPI and job name are required' });
    }

    const result = await addRelationUserToJob(dpi, job);

    if (result) {
      res.status(200).json({ success: `Job "${job}" added to user with DPI ${dpi}` });
    } else {
      res.status(404).json({ error: `Could not add job "${job}" to user with DPI ${dpi}` });
    }

  } catch (error) {
    console.error('Error adding job to user:', error);
    res.status(500).json({ error: 'Internal Server Error while adding job to user' });
  }
});

app.delete('/api/neo/DeleteJobToWorker', apiKeyAuth, async (req, res) => {
  try {
    const { dpi, job } = req.body;

    if (!dpi || !job) {
      return res.status(400).json({ error: 'Both DPI and job name are required' });
    }

    const result = await deleteRelationUserTojob(dpi, job);

    if (result) {
      res.status(200).json({ success: `Job "${job}" deleted to user with DPI ${dpi}` });
    } else {
      res.status(404).json({ error: `Could not delete job "${job}" to user with DPI ${dpi}` });
    }

  } catch (error) {
    console.error('Error deLeting job to user:', error);
    res.status(500).json({ error: 'Internal Server Error while deleting job to user' });
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
    const [dpitrabajador, titulo, estado, imagen] = [req.body.dpitrabajador, req.body.titulo, req.body.estado, req.body.imagen]

    const parts = imagen.split(/[;/]+/);
    const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const respuesta = await uploadFile(randoms + '.' + parts[1], imagen)


    const result = await insertartrabant(dpitrabajador, titulo, estado, 'https://contratogt.com/api/image/' + respuesta)
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

app.put('/api/contacts/editMessage', apiKeyAuth, async (req, res) => {
  try {
    const { contenido, id_chat, id_msg } = req.body;

    if (!contenido || !id_chat || !id_msg) {
      return res.status(400).json({ error: 'contenido, id_chat, and id_msg are required and cannot be empty' });
    }

    const result = await editChatMessage(id_chat, id_msg, contenido);

    if (result) {
      res.status(200).json({ success: 'Mensaje modificado' });
    } else {
      res.status(404).json({ error: 'No se modificó el mensaje' });
    }
  } catch (error) {
    console.error('Error editing message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


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
      return res.status(400).json({ error: 'Failed to create post, empty values are not allowed' });
    }

    let imageUrl = null;

    // Si se proporciona una imagen, sube el archivo
    if (postImage) {
      const parts = postImage.split(/[;/]+/);
      const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
      const respuesta = await uploadFile(randoms + '.' + parts[1], postImage);
      imageUrl = 'https://contratogt.com/api/image/' + respuesta;
    }

    // Crear nuevo threadpost, incluyendo imageUrl solo si hay una imagen
    const post = await createThreadPost(dpiUser, postText, imageUrl);

    if (post) {
      return res.status(200).json({ success: "Successfully created new post" });
    } else {
      return res.status(400).json({ error: "Failed to create post" });
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

app.get('/api/image/:fileID', async (req, res) => {
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

app.post('/api/insertimage/', apiKeyAuth ,async (req, res) => {
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

app.get('/api/review/:id/', apiKeyAuth, async (req, res) => {
  try {
    const { id } = req.params
    const comments = await getreviewone(id)

    if (comments) {
      res.status(200).json(comments)
    } else {
      res.status(400).json({ error: "Falied to retrieve review with ID" });
    }

  } catch (error) {
    console.error("Error while getting thread comments:", error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.put('/api/setWorking/', apiKeyAuth, async (req, res) => {
	const { dpi } = req.body;

	if (!dpi) {
		return res.status(400).json({ error: 'Failed to update working state, missing dpi in body' })	
		} else {
	try {
		const result = await setWorkingState(dpi);
		res.send('Updated working state')

	} catch (error) {
		console.log('Error updating state:', error)
		res.status(500).json({ error: 'Internal Server Error'})
	}
	}
})

app.post('/api/pfnework/', apiKeyAuth ,async (req, res) => {
  try {
    const { trabajo, dpi } = req.body;

    const response = await setnewtrabajoperfil(trabajo, dpi);

    if (response) {
      return res.status(200).json({ success: "Successfully inserted a petition for work" + response });
    } else {
      return res.status(400).json({ error: "Falied to create a new work maybe exists?" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/pfnework/', apiKeyAuth ,async (req, res) => {
  try {
    const { trabajo, dpi } = req.body;

    const response = await setnewtrabajoperfil(trabajo, dpi);

    if (response) {
      return res.status(200).json({ success: "Successfully inserted a petition for work" + response });
    } else {
      return res.status(400).json({ error: "Falied to create a new work maybe exists?" });
    }

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/removework/', apiKeyAuth ,async (req, res) => {
  try {
    const { trabajo} = req.body;

   await removenew_trabajo(trabajo);

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.get('/api/gettrabajos/', apiKeyAuth ,async (req, res) => {
  try {

   const result = await gettrabajos();

   return res.status(200).json(result);
   
  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/setHiringState/', async (req, res) => {
  const { chatID, state } = req.body; // Accedemos correctamente al body

  // Validación de parámetros
  if (!chatID || typeof state !== 'boolean') {
    return res.status(400).json({ error: 'Invalid input. chatID is required and state must be a boolean.' });
  }

  try {
    await setHiringState(chatID, state);
    return res.status(200).json({ success: "Successfully changed hiring state" }); // Corregido el mensaje de éxito
  } catch (error) {
    console.error('Error in POST:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.put('/api/changedescription/', apiKeyAuth ,async (req, res) => {
  try {
    const { trabajo, descripcion} = req.body;

    const result = await chworkdescription(trabajo, descripcion);

    res.status(200).json(result)

  } catch (error) {
    console.error('Error post:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.post('/api/users', apiKeyAuth, async (req, res) => {
  try {
    const {
      dpi, name, lastnames, password, email, phoneNumber, role, departamento, municipio
    } = req.body

    const imagen = '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'

    const ban = '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E+y3qkR0wbt36SBsuZxaLoPUsspZYj5E/HeHmMsz08Lv4OFlnow4ZZl1LLMssspZZZZllLKWWWWWWUyyyyyymWWWU29viWZmWJFKq8Y2guOcemO8vv8An84buX3lvBiXD72+fWXVq1eY4l3M+IA2Q2wbOnq0TZLLF9RlNXccEi2MbxFnzl+KwSHmfZLrakgdSyyyyyymUsssssspZalllllLLMssssuDLLMssyzcR7tyywytgD9bZLuFJpI9OB9+/vIDTL5H19PpjoWi/SZi6kKO40EtuS8ZZcWmqelHAj09QDvpbwmUBayvS3b6kZHgl+CbU8yu23jfy4WWWWWUssssssssssssyyyllMpllLKWWWWWWWZZZl1a31l3yS6mWUxMvMzLxltXy/yJmb2v+/clvj/m630kD+pmJcYbxLcr7z4h08W00/XAl6m+Zu8CCDjGtxr3N3BC77k4DWFws/J6wyyyllmZSylllllllllLLLLLLKZSyyyyllLMsspZZdzbhLMsss3OC7xvG+HHk8NyHDweft9m2hckNHpixM2MbmenHVYDcusIJphIt/E+mZ2YBjdcQI7tbuUsxDSQvbV2ZjsPUsspZZZlLKWWWWXcssspZZZZZZTKWWWWUylmWWUsssylltzfvhZTMp57cX0sr3NNPpim8SE5rc36ee/vdsXB8ftjUwstxmHI0oyOQW7bPlLdq6gEO26Msstz+k+pZZZZZllllllMpZZZZZZSymUyyyyyyyyyllMssylllmVpD3MsssuoA2yelvi3xjvLf5f5nFw/oxqfrMw2bnjGpYdrWGOz6YXUuUsoDaXc41zK0cEudyyymUssssplLLLLLLLLLLLLLLLKWUssssplmWWWWWWWWXUtrx4t76lLhWx2ff8AFz+9M5Z9Xg7iHBOLhzeNAzLKGmJZbvhluRq8GOjLrudrnUh4kTu0s0cF3zHEspZZZcX1yylllllllllLLLuWWZSyyyyyylllllll8Syy7llLMsy6tm/SWZbjztLfNy+IC7GMD35vaZTHc9v/ALxhtAyzcp44lnJZZhp4dmMbXmIicw1h6XUL9Y+mJZZZSy4ltpzHcTLLKWWWWWWUspZSyyllLLLLLLL4mWWWUsssspZlt0WWVdUr7puYu8Nu1/K9Y6TkJ7pcLYlltRst7JlllllmG9TVyuRqNJluU3iI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'

    const randoms = Math.floor(Math.random() * (14 - 1 + 1)) + 1;
    const banner = await uploadFile(randoms + '.jpg', ban)

    const imagens = await uploadFile((randoms - 1) + '.jpg', imagen)





    const result = await insertUser(dpi, name, lastnames, password, email, phoneNumber, role, departamento, municipio, 'https://contratogt.com/api/image/'+imagens, 'https://contratogt.com/api/image/'+banner)
    res.status(200).json({ Succes: 'User inserted' })
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})
