console.log('products.js loadad.')

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
  

