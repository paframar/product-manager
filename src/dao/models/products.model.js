import { Schema, model } from 'mongoose'

const schema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    thumbnail: String,
    code: {type: Number, required: true},
    stock: {type: Number, required: true},
    status: {type: Boolean, required: true}
}, {
    timestamps: true
})

const productsDAO =  model('productsDAO', schema, 'products')

export default productsDAO

