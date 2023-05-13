import { Schema, model } from 'mongoose'

const schema = new Schema({
    userEmail: String,
    message: String
}, {
    timestamps: true
})

const messagesDAO =  model('messagesDAO', schema, 'messages')

export default messagesDAO

