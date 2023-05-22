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

const getCartData = async (cart) => {
  try {
    const products = await productManager.getProducts();

    cart.products.map(cartProduct => {
      let product = products.filter(product => product._id == cartProduct.pid)
      if (product.length > 0){
        product = product[0]
        Object.keys(product).map(key => {
          cartProduct[key] = product[key]
        })
      }
    })

    let cartData = {_id: cart._id, products: cart.products}

    console.log('******************** cartData ', cartData)

    return cartData;

  } catch (error) {
    console.log('error getCartData ', error)
  }

  return null;
};

export const renderRealtimeCart = async (req, res) => {
    try {
      const cart = await cartManager.getCart(process.env.USER_ID);
      const cartData = await getCartData(cart)
      console.log('recived cardData: ', cartData)
      res.render('realtimeCart', { cartData })
    } catch (error) {
      console.log(error);
    }
};

export const renderMessages = (req,res) => { res.render('messages') }
export const renderHome = (req, res) => { res.render('home') };


router.get('/realtimeproducts', renderRealtimeProducts);
router.get('/realtimecart', renderRealtimeCart);
router.get('/messages', renderMessages);
router.get('/', renderHome);

export default router