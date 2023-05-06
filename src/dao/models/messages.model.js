import mongoose from 'mongoose'
const messagesCollection = 'carts'

const messagesSchema = new mongoose.Schema({
    userEmail: String,
    message: String
})

const messagesModel = mongoose.model(messagesCollection, messagesSchema)

export default messagesModel 