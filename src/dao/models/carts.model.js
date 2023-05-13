import { Schema, model } from 'mongoose'

const schema = new Schema({
    id: Number,
    products: Array
}, {
    timestamps: true
})

const cartsDAO =  model('cartsDAO', schema, 'carts')

export default cartsDAO