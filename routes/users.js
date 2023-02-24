import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
const router = express.Router()

router.post('/signup', async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (existingUser) return res.status(404).json({ message: "User exists" })

        if (password !== confirmPassword) return res.status(404).json({ message: "Passwords dont match" })

        const hashedPassword = await bcrypt.hash(password, 12)

        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        const token = jwt.sign({ email: result.email, id: result.id }, process.env.JWT_SECRET, { expiresIn: 604800 })

        res.status(200).json({ result: result, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User doesnt exist" })

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Incorrect password" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser.id }, process.env.JWT_SECRET, { expiresIn: 604800 })

        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' })
    }
})

router.get('/', async (req, res) => {
    const email = req.query

    try {
        const user = await User.find(email)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})

export default router