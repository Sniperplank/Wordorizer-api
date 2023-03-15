import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const router = express.Router()
import { Configuration, OpenAIApi } from 'openai'
const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY
});

const openai = new OpenAIApi(configuration);

router.get('/:word/:definition', async (req, res) => {
    const { word, definition } = req.params
    try {
        const completions = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { "role": "system", "content": "You will act as a dictionary that will verify if an input is a valid definition of a word" },
                { "role": "user", "content": "Is the following a correct definition of " + word + "?\n'" + definition + "'\nReply with yes or no only" }
            ],
        });

        const message = completions.data.choices[0].message.content

        res.json({ message: message })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' })
    }
})

export default router