import mongoose from "mongoose"

const memWordSchema = mongoose.Schema({
    word: { type: String, required: true },
    definition: { type: String, required: true },
    userId: { type: String, required: true },
    id: { type: String }
})

export default mongoose.model('MemorizedWords', memWordSchema)