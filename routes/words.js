import express from 'express'
import Word from '../models/word.js'
import MemorizedWords from '../models/memWords.js'
const router = express.Router()

router.post('/', async (req, res) => {
    const { word, definition, userId } = req.body
    try {
        const existingWord = await Word.findOne({ word })
        const existingMemWord = await MemorizedWords.findOne({ word })
        if (existingWord || existingMemWord) return res.status(404).json({ message: "Word already added!" })
        const result = await Word.create({ word, definition, userId })
        res.status(200).json({ result })
    } catch (error) {
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

router.delete('/:_id', async (req, res) => {
    const { _id } = req.params
    await Word.findOneAndDelete({ _id: { $eq: _id } })
    res.json({ message: 'Word deleted succesfully' })
})

router.post('/memorized', async (req, res) => {
    const { word, definition, userId } = req.body
    try {
        const result = await MemorizedWords.create({ word, definition, userId })
        res.status(200).json({ result })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/memorized', async (req, res) => {
    const { userId } = req.query
    try {
        const words = await MemorizedWords.find({ userId: { $eq: userId } })
        res.status(200).json(words)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

router.delete('/memorized/:_id', async (req, res) => {
    const { _id } = req.params
    await MemorizedWords.findOneAndDelete({ _id: { $eq: _id } })
    res.json({ message: 'Word deleted succesfully' })
})

export default router