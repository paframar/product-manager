console.log('index.js [ √ ]')

let socketClient = io()
const productsForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');

socketClient.emit('getProducts')

productsForm.addEventListener('submit', e => {
  e.preventDefault()

  console.log('submit event')
  
  const formData = new FormData(e.currentTarget)

  const data = {
    "title": formData.get("title"),
    "description": formData.get("description"),
    "price": formData.get("price"),
    "thumbnail": formData.get("thumbnail"),
    "code": formData.get("code"),
    "stock": formData.get("stock"),
    "status": formData.get('status'),
  }

  const url = 'http://localhost:8080/api/products';

  axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => console.log(response))
  .then(() => socketClient.emit('getProducts'))
  .catch(error => console.error(error))

  
});

socketClient.on('updateProductList', products => {
  console.log(' products recived: ', products)
  let listContent = ""
  let listRow = ""
  products.map((product, i) => {
    const { title, thumbnail, description, price, stock, code } = product
    listContent = `${listContent}<li style="list-style-type: none; padding:20px; border-style: solid; border-radius: 20px; margin: 10px; width: 40%;">
      <h3>${title}</h3>
      <img style="max-height: 15vh;" src="${thumbnail}" alt="${title}">
      <p>Description: ${description}</p>
      <p>Price: ${price}</p>
      <p>Stock: ${stock} pieces.</p>
      <p>Code: ${code} </p>`
  })
  productsList.innerHTML = listContent
})

