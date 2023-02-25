import express from 'express'
import Word from '../models/word.js'
const router = express.Router()

router.post('/', async (req, res) => {
    const { word, definition, userId } = req.body
    try {
        const result = await Word.create({ word, definition, userId })
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/', async (req, res) => {
    const { userId } = req.query
    try {
        const words = await Word.find({ userId: { $eq: userId } })
        res.status(200).json(words)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

export default router