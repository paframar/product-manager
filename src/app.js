import express from 'express';
import handlebars from 'express-handlebars';
import cartRouter from './routes/cart.router.js';
import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';

import ProductManager from './dao/ProductManager.js';
import CartManager from './dao/CartManager.js';

import { Server as WebsocketServer } from 'socket.io'

import sockets from './sockets.js';
import connectDB from './db.js';

import MongoProductManager from './dao/MongoProductManager.js'
import MongoCartManager from './dao/MongoCartManager.js';

const cartManager = new MongoCartManager()

const app = express();
const httpServer = app.listen(8080, () => console.log('Server Up.'))

const io = new WebsocketServer(httpServer);
sockets(io)

console.log('Connecting DB.')
connectDB()

console.log('Initializing User Cart.')
cartManager.InitializeUserCart('userTestId');

console.log('Midlewares.')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./src/public'))
app.use(express.json())

console.log('Handlebars engine.')
app.engine('handlebars', handlebars.engine())
app.set('views','./src/views')
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)

console.log('Server routes.')
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


// const productManager = new ProductManager()
// const cartManager = new CartManager()

// productManager.initializeProducts();
// cartManager.initializeCarts();




