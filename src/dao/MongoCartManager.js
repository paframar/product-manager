import cartsDAO from "./models/carts.model.js";

export default class MongoCartManager {

  async getCart() {
    try {
      const cart = await cartsDAO.findOne({ userId: process.env.USER_ID }).lean().exec();
      return cart
    } catch (error) {
      console.error('Error getting carts from Mongo DB: ', error);
      return null;
    }
  }

  async InitializeUserCart() {
    const cart = await this.getCart();
    if (cart == null){
      const emptyModel = {
        userId: process.env.USER_ID,
        products: [],
      };
      cartsDAO.create(emptyModel);
      const newCart = await this.getCart();
      console.log('InitializeUserCart - *NEW* Cart: ', newCart);
    } else {
      console.log('InitializeUserCart - Cart: ', cart);
    }
  }

  async addProductToCart(pid){
    console.log('addProductToCart')
    try {
      const cart = await this.getCart();
      const { products } = cart;
      let newProduct = true;
      
      console.log('cart products ', products)
      products.map(product => {
        if (product.pid === pid){
          newProduct = false;
          product.quantity ++;
        }
      });

      if (newProduct === true){
        products.push({ pid, quantity: 1});
      }

      console.log('cart products updated: ', products)

      this.updateCart(cart._id, {userId: process.env.USER_ID, products});

    } catch (error) {
      console.log('error ', error)
    }
  }

  async updateCart(cartId, updatedCart) {
    try {
      await cartsDAO.findByIdAndUpdate(cartId, updatedCart, { new: true }).lean().exec();
      console.log(`Cart updated successfully.`);
    } catch (error) {
      console.error('Error updating product in Mongo DB: ', error);
      return null;
    }
  }

  // async deleteCartProduct(productId) {
  //   try {
  //     await productsDAO.findByIdAndRemove(productId).exec();
  //     console.log(`Product with id ${productId} deleted successfully.`);
  //   } catch (error) {
  //     console.error('Error deleting product from Mongo DB: ', error);
  //   }
  // }

}
