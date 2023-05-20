console.log('main.js loadad.')

// PRODUCT LIST UPDATE

let clientSocket = io();

clientSocket.on('loadProducts', products => updateProductList(products))

const updateProductList = (products) => {
    console.log('updateProductList()')
    const productsList = document.getElementById('products-list');
    let listContent = '';
    products.forEach((product) => {
        listContent += `
            <li class="product-item">
                <img style="max-height: 5vh;" src="${product.thumbnail}" alt="${product.title}">
                <h4 class="product-item-text">${product.title}</h4>
                <p class="product-item-text">${product.description}</p>
                <p class="product-item-text">Code: ${product.code}</p>
                <p class="product-item-text">Price: ${product.price}</p>
                <p class="product-item-text">Stock: ${product.stock} pieces.</p>
                <button onclick="deleteProduct('${product._id}')">Del</button>
                <button onclick="updateProduct('${product._id}')">Upd</button>
            </li>`;
    });
    productsList.innerHTML = listContent;
};

// const deleteProduct = (pid) =>{
//     console.log('main.js/deleteProduct: ', pid)
//     fetch(`http://localhost:8080/api/products/${pid}`, {
//         method: "delete"
//     })
//     .then(() => {
//         location.href = '/realtimeproducts';
//     })
//     .catch(error => console.error(error));
// };
// const updateProduct = (pid) => {
//     console.log('main.js/updateProduct: ', pid)
//     const productForm = document.getElementById('product-form');
//     const formData = new FormData(productForm);
//     const updatedProduct = {
//         title: formData.get('title'),
//         description: formData.get('description'),
//         price: formData.get('price'),
//         thumbnail: formData.get('thumbnail'),
//         code: formData.get('code'),
//         stock: formData.get('stock'),
//         status: formData.get('status')
//     };
//     fetch(`http://localhost:8080/api/products/${pid}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedProduct)
//     })
//     .then((response) => {
//         window.location.href = '/realtimeproducts';
//     })
//     .catch(error => console.error(error));
// };


// const deleteProduct = (pid) => {
//     console.log('main.js/deleteProduct: ', pid);
//     axios.delete(`http://localhost:8080/api/products/${pid}`)
//     .then((response) => {
//         console.log('update done - ', response);
//     })
//     .then(() => {
//         document.location.replace('/realtimeproducts');
//     })
//     .catch(error => console.error(error));
// };
// const updateProduct = (pid) => {
//     const productForm = document.getElementById('product-form');
//     const formData = new FormData(productForm);

//     const updatedProduct = {
//         title: formData.get('title'),
//         description: formData.get('description'),
//         price: formData.get('price'),
//         thumbnail: formData.get('thumbnail'),
//         code: formData.get('code'),
//         stock: formData.get('stock'),
//         status: formData.get('status')
//     };

//     axios.put(`http://localhost:8080/api/products/${pid}`, updatedProduct, {
//         headers: {
//             'Content-Type': 'application/json'
//             }
//         })
//         .then(() => {
//             window.location.href = '/realtimeproducts';
//         })
//         .catch(error => console.error(error)
//     );
// };
// const productsForm = document.getElementById('product-form');
// productsForm.addEventListener('submit', e => {

//     console.log('form `submit` event listened.')

//     e.preventDefault()

//     console.log('submit event')

//     const clientSocket = io()

//     const formData = new FormData(e.currentTarget)

//     const newProduct = {
//         "title": formData.get("title"),
//         "description": formData.get("description"),
//         "price": formData.get("price"),
//         "thumbnail": formData.get("thumbnail"),
//         "code": formData.get("code"),
//         "stock": formData.get("stock"),
//         "status": formData.get('status'),
//     }

//     const url = 'http://localhost:8080/api/products';

//     axios.post(url, newProduct, {
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     })
//     .then(response => {
//         console.log(response)
//     })
//     .then( () => {
//         window.location.href = '/realtimeproducts';
//     })
//     .catch(error => console.error(error))

// });

  const deleteProduct = (pid) => {
    console.log('main.js/deleteProduct: ', pid);
    axios
      .delete(`http://localhost:8080/api/products/${pid}`)
      .then(() => {
        console.log(' * delete done *');
        window.location.href = '/realtimeproducts';
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const updateProduct = (pid) => {
    const productForm = document.getElementById('product-form');
    const formData = new FormData(productForm);

    const updatedProduct = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      thumbnail: formData.get('thumbnail'),
      code: formData.get('code'),
      stock: formData.get('stock'),
      status: formData.get('status'),
    };

    axios
      .put(`http://localhost:8080/api/products/${pid}`, updatedProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        console.log(' * update done *');
        window.location.href = '/realtimeproducts';
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // ...
  
  const productsForm = document.getElementById('product-form');
  
  productsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('form `submit` event listened.');
  
    const formData = new FormData(e.currentTarget);
  
    const newProduct = {
      title: formData.get('title'),
      description: formData.get('description'),
      price: formData.get('price'),
      thumbnail: formData.get('thumbnail'),
      code: formData.get('code'),
      stock: formData.get('stock'),
      status: formData.get('status'),
    };
  
    axios
      .post('http://localhost:8080/api/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        console.log(' * create done *');
        window.location.href = '/realtimeproducts';
      })
      .catch((error) => {
        console.error(error);
      });
  });
  

