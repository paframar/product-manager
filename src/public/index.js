console.log('index.js [ √ ]')

const axios = require('axios')

let realTimeProductList = document.getElementById("real-time-product-list")
let addProductButton =  document.getElementById("add-product-button")

let title = document.getElementById("title")
let description = document.getElementById("description")
let thumbnail = document.getElementById("thumbnail")
let code = document.getElementById("code")
let stock = document.getElementById("stock")
let statusInput = document.getElementById("status")

console.log('title: ', title)
    
const socket = io()

socket.on('product-updated', () => {
    console.log('Actualizando lista de productos');
    axios.get('localhost:8080/api/products')
        .then((res) => {
            let listContent = ""
            res.products.map((product) => {
                listContent = listContent + `<li>${product.title}</li>`
            })    
            realTimeProductList.innerHTML = listContent
        })
        .catch((error) => {
            console.error(error);
        });
});

// addProductButton.addEventListener('click' evt => {
// })

function handleAddProduct() {
    
    console.log('handleAddProduct() [ √ ]')

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const thumbnail = document.getElementById('thumbnail').value;
    const code = document.getElementById('code').value;
    const stock = document.getElementById('stock').value;
    const status = document.getElementById('status').value;
  
    const data = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status
    };

    axios.post('localhost:8080/api/products', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((response) => {
        console.log(response.data);
        // hacer algo si la petición es exitosa
      })
      .catch((error) => {
        console.error(error);
        // hacer algo si la petición falla
      });

}
  

