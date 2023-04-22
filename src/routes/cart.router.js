const { Router } = require('express')
const manager = require('../classes/CartManager.js')

const router = Router()



router.get('/:cid', (req, res) => {
    const message = 'Showing Cart: #' + req.params.cid
    let cartProducts = manager.getCartProducts(Number(req.params.cid))
    res.send({ message, cartProducts})
});


router.post('/', (req, res) => {
    let newCartProducts = []
    req.body.map((product)=> {
        newCartProducts.push({ pid: product.id, quantity: 1 })
    })
    manager.addCart(newCartProducts)
    const message = '[ √ ] Cart added.'
    const cartProducts = manager.getCarts()
    res.send({ message, cartProducts})
});

router.post('/:cid/product/:pid', (req, res) => {
    const message = 'Updated Cart #' + req.params.cid
    manager.addProductToCart(
        Number(req.params.cid),
        Number(req.params.pid),
    )
    const cartProducts = manager.getCarts()
    res.send({ message, cartProducts})
});

module.exports = router