import { Router } from 'express';
// import ProductManager from '../dao/ProductManager.js';
import MongoProductManager from '../dao/MongoProductManager.js';
import MongoCartManager from '../dao/MongoCartManager.js';

const router = new Router()
// let productManager = new ProductManager()
let productManager = new MongoProductManager()
let cartManager = new MongoCartManager()

export const renderRealtimeProducts = async (req, res) => {
    try {
      const products = await productManager.getProducts();
      res.render('realtimeProducts', { products })
    } catch (error) {
      console.log(error);
    }
};

export const renderRealtimeCart = async (req, res) => {
    try {
      const cart = await cartManager.getCart();
      res.render('realtimeCart', { cart })
    } catch (error) {
      console.log(error);
    }
};

export const renderMessages = (req,res) => {
  res.render('messages');
}


router.get('/', (req, res) => {
  res.render('home');
});

router.get('/realtimeproducts', renderRealtimeProducts);
router.get('/realtimecart', renderRealtimeCart);
router.get('/messages', renderMessages);

export default router