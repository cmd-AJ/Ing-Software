import express from 'express'
import cors from 'cors'
import { getUsers, insertUser, gettrabajo, getUserbyDPI, setsettings, getContactsByUserDPI, getChatBetweenUsers, updatetrab} from './db.js'
import { getWorkers, getTrustedUsersByDpi } from './neo.js'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

app.get('/users', async (req, res) => {
  try {
    const users = await getUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.post('/users', async (req, res) => {
  try {
    const {
      dpi, name, lastnames, password, email, phoneNumber, role
    } = req.body

    const result = await insertUser(dpi, name, lastnames, password, email, phoneNumber, role)
    res.status(200).json({ Succes: 'User inserted' })
  } catch (error) {

  }
})

app.get('/users/:dpi', async (req, res) => {
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

app.get('/workers/:job', async (req, res) => {
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

app.put('/setsettings', async (req, res) => {
  const [municipio, imagen, sexo, fecha_nacimiento, numero, DPI, rol] = [req.body.municipio, req.body.imagen, req.body.sexo, req.body.fecha_nacimiento, req.body.numero, req.body.DPI, req.body.rol]
  if (!municipio || !imagen || !sexo || !fecha_nacimiento || !numero || !DPI || !rol) {
    res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
  } else {
    try {
      const resp = await setsettings(municipio, imagen, sexo, fecha_nacimiento, numero, DPI, rol)
      res.send('Inserted succesfully')
    } catch (error) {
      throw error
    }
  }
})


app.get('/ctrabajo/:dpi', async (req, res) => {
  try {
    const { dpi } = req.params
    const user = await gettrabajo(dpi)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ error: 'user not found' })
    }

  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

app.get('/contacts/:dpi', async (req, res) => {
  try {
    const { dpi } = req.params;
    const contacts = await getContactsByUserDPI(dpi);
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error getting contacts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/trustNetwork/:dpi', async (req, res) => {
  try {
    const { dpi } = req.params;
    const trustedUsers = await getTrustedUsersByDpi(dpi)
    res.status(200).json(trustedUsers);

  } catch (error) {
    console.error('Error getting trusted Users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.post('/contacts/messages', async (req, res) => {
  try {
    const { dpi1, dpi2 } = req.body;
    const chatMessagges = await getChatBetweenUsers(dpi1, dpi2)
    res.status(200).json(chatMessagges);

  } catch (error) {
    console.error('Error getting chat messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


app.put('/confitrab', async (req, res) => {
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
