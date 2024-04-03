import express from 'express'
import cors from 'cors'
import { getUsers, insertUser, getUserbyDPI } from './db.js'

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

  app.listen(port, () => {
    console.log(`Server listening at http://127.0.0.1:${port}`)
  })