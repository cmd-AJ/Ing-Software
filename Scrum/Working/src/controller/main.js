import express from 'express'
import cors from 'cors'
import { getUsers, insertUser, getUserbyDPI, getWorkers, setsettings } from './db.js'

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

  app.post('/users', async(req, res) => {
    try {
        const {
            dpi, name, lastnames, password, email, phoneNumber, role
        } = req.body

        const result = await insertUser(dpi, name, lastnames, password, email, phoneNumber, role)
        res.status(200).json({ Succes: 'User inserted' })
    } catch (error) {
        
    }
  })

  app.get('/users/:dpi', async(req, res) => {
    try {
      const { dpi } = req.params
      const user = await getUserbyDPI(dpi)

      if(user){
        res.status(200).json(user)
      } else{
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

  app.put('/setsettings', async(req, res) => {
    const [ municipio, imagen, sexo, fecha_nacimiento, numero, DPI ] = [req.body.municipio, req.body.imagen, req.body.sexo, req.body.fecha_nacimiento, req.body.numero, req.body.DPI]
    if (!municipio || !imagen || !sexo || !fecha_nacimiento || !numero || !DPI) {
      res.status(400).json({ error: 'Datos incompletos en el cuerpo de la solicitud' })
    } else {
      try {
        const resp = await setsettings(municipio, imagen, sexo, fecha_nacimiento, numero, DPI) 
        res.send('Inserted succesfully')
      } catch (error) {
          throw error
      }
    }
  })