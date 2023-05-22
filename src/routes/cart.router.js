import { Router } from 'express'
import MongoCartManager from '../dao/MongoCartManager.js'
import { renderRealtimeCart } from './views.router.js'

const router = Router()
const cartManager = new MongoCartManager()

router.put('/:pid', (req, res) => {
    const { pid } = req.params
    console.log('cart.router put pid: ', pid)
    cartManager.addProductToCart(pid)
    console.log('cartManager.addProductToCart passed.')
    // renderRealtimeCart(req, res)
});

export default router