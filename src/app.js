
import manager from './ProductManager.js'
import express from 'express'

const app = express()

manager.initializeProducts()

app.get('/products', (req, res)=> {
    const limit = Number(req.query.limit)
    const products = manager.getProducts(limit)
    res.send({ products })
})

app.get('/products/:pid', (req, res)=> {
    let product = manager.getProductById(Number(req.params.pid))
    res.send ( { product } )
})


app.listen(8080, () => console.log('* * * product-manager-server up! * * * '))

