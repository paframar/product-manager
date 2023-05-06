import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './dao/ProductManager.js';
import CartManager from './dao/CartManager.js';
import mongoose from 'mongoose'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// const httpServer = app.listen(8080, () => console.log('Server Up'))

app.engine('handlebars', handlebars.engine())
app.set('views','./src/views')

app.set('view engine', 'handlebars')
app.use(express.static('./src/public'))

app.use('/', viewsRouter)
app.use(express.json())

app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const productManager = new ProductManager()
const cartManager = new CartManager()

productManager.initializeProducts();
cartManager.initializeCarts();



mongoose.set('strictQuery', false)
try {
    await mongoose.connect('mongodb+srv://coder:coder@backend39755.3gncg2t.mongodb.net/pokedex')
    app.listen(8080, () => console.log('Server Up'))
    const socketServer = new Server(httpServer)

  } catch (error) {
    console.log('No se pude conectar con la BD')
  }
  
socketServer.on('connection', (socketClient) => {
    console.log(`[ √ ] ${socketClient.id} connected.`)
    socketClient.on('getProducts', () => {
        const products = productManager.getProducts();
        socketServer.emit('updateProductList', products)
    })
})