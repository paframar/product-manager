console.log('main.js loadad.')

const productsForm = document.getElementById('product-form');
const productsList = document.getElementById('products-list');

const clientSocket = io();

clientSocket.on('loadProducts', products => {
    console.log('`loadProducts` listened.')
    let listContent = ""
    style = 'font-family: Monaco; font-size: 11px;'
    products.map((product, i) => {
        const { _id, title, thumbnail, description, price, stock, code } = product
        listContent = `${listContent}<li style="display: flex; align-items: center; justify-content: space-around; 
            list-style-type: none; border-style: solid; border-width: 1px; border-color: salmon; 
            border-radius: 20px; margin-top: 10px; width: 80%; background-color: #000';">
        <img style="max-height: 5vh;" src="${thumbnail}" alt="${title}">
        <h4 style="${style}">${title}</h4>
        <p style="${style}">Description: ${description}</p>
        <p style="${style}">Price: ${price}</p>
        <p style="${style}">Stock: ${stock} pieces.</p>
        <button onclick="deleteProduct(${_id})">Delete</button> </li>`
    })
    productsList.innerHTML = listContent
})

productsForm.addEventListener('submit', e => {

    console.log('form `submit` event listened.')

    e.preventDefault()

    console.log('submit event')

    const formData = new FormData(e.currentTarget)

    const newProduct = {
        "title": formData.get("title"),
        "description": formData.get("description"),
        "price": formData.get("price"),
        "thumbnail": formData.get("thumbnail"),
        "code": formData.get("code"),
        "stock": formData.get("stock"),
        "status": formData.get('status'),
    }

    const url = 'http://localhost:8080/api/products';

    axios.post(url, newProduct, {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => {
        console.log(response)
    })
    .then( () => {
        clientSocket.emit('updateProducts')
        console.log('`updateProducts` emited.')
    })
    .catch(error => console.error(error))

});


