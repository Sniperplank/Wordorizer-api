import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import wordRoutes from './routes/words.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use('/user', userRoutes)
app.use('/word', wordRoutes)

app.get('/', (req, res) => {
    res.send('wordorizor api')
})

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message))