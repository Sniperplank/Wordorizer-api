import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/users.js'
import wordRoutes from './routes/words.js'
import fs from 'fs'
import readLine from 'readline'
import Word from './models/word.js'


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


// async function importWords() {
//     const fileStream = fs.createReadStream('words.txt');
//     const rl = readLine.createInterface({
//         input: fileStream,
//         crlfDelay: Infinity
//     });

//     rl.on('line', async (line) => {
//         const [word, definition] = line.split(': ');
//         await Word.create({ word, definition, userId });
//     })

//     rl.on('close', () => {
//         console.log('Import completed');
//     });
// }

// importWords()