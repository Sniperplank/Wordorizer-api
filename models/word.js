import mongoose from "mongoose"

const wordSchema = mongoose.Schema({
    word: { type: String, required: true },
    definition: { type: String, required: true },
    userId: { type: String, required: true },
    id: { type: String }
})

export default mongoose.model('Word', wordSchema)