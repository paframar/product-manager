const express = require('express');
const handlebars = require('express-handlebars');
const { Server } = require('socket.io');
const cartRouter = require('./routes/cart.router.js');
const productsRouter = require('./routes/products.router.js');
const viewsRouter = require('./routes/views.router.js');
const ProductManager = require('./classes/ProductManager.js');
const CartManager = require('./classes/CartManager.js');

const app = express()
const httpServer = app.listen(8080, () => console.log('Server Up'))
const socketServer = new Server(httpServer)

// const __dirname = path.dirname(new URL(import.meta.url).pathname);
console.log('dirname ', __dirname)

app.engine('handlebars', handlebars.engine())
// app.set('views', __dirname+'/views')
app.set('views','./src/views')

app.set('view engine', 'handlebars')
// app.use(express.static(__dirname+'/public'))
app.use(express.static('./src/public'))
app.use('/', viewsRouter)

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

const productManager = new ProductManager()
const cartManager = new CartManager()

productManager.initializeProducts();
cartManager.initializeCarts();
