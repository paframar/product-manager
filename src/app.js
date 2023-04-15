import express from 'express'
import cartRouter from './routes/cart.router.js'
import productsRouter from './routes/products.router.js'
import productManager from './classes/ProductManager.js'

const app = express()

productManager.initializeProducts();

app.use(express.json())
app.use('/products', productsRouter)
app.use('/cart', cartRouter)

app.listen(8080, () => console.log('[ √ ] server up!'))


