import mongoose from 'mongoose'
const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: Number,
    stock: Number,
    status: Boolean
})

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel 