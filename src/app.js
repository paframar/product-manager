import express from 'express'
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js'

import productManager from './classes/ProductManager.js'
import cartManager from './classes/CartManager.js'

const app = express()

productManager.initializeProducts();
cartManager.initializeCarts();

app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)

app.listen(8080, () => console.log('[ √ ] Server up!'))