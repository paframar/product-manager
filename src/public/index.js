console.log('index.js [ √ ]')

// let socketClient = io()
const productsForm = document.querySelector('#product-form');
// const productsList = document.querySelector('#products-list');

productsForm.addEventListener('submit', e => {
  e.preventDefault()
  
  const formData = new FormData(e.currentTarget)

  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    price: formData.get('price'),
    thumbnail: formData.get('thumbnail'),
    code: formData.get('code'),
    stock: formData.get('stock'),
    status: formData.get('status'),
  }

  console.log('data = ', data)

  const url = 'localhost:8080/api/products';

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .catch(error => console.error(error));

  // socketClient.emit('newProductAdded')
})

// socketClient.on('updateProductList', products => {
//   console.log('products recived ', products)
// })

