import { Schema, model } from 'mongoose'

const schema = new Schema(
    {
        userId: { type: String, required: true},
        products: Array,
    }, 
    {
        timestamps: true
    }
)

const cartsDAO =  model('cartsDAO', schema, 'carts')

export default cartsDAO