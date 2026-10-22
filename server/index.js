import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

//For testing purposes
dotenv.config()

app.get('/api/health', (req, res) => res.json({ ok: true }))

const PORT = process.env.PORT || 4000

/* mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`API running on ${PORT}`)))
  .catch(err => console.error(err))
*/

//For testing purposes
console.log('MONGO_URI loaded:', Boolean(process.env.MONGO_URI))

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from .env')
    }

    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB Atlas')

    app.listen(PORT, () => {
      console.log(`API running on ${PORT}`)
    })
  } catch (error) {
    console.error('Startup failed:', error.message)
  }
}

startServer()