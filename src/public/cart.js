console.log('cart.js loadad.')

const addToCart = (pid) => {
  console.log('addToCart')
  axios
    .put(`http://localhost:8080/api/cart/${pid}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(() => {
      console.log(' * cart update done *');
      window.location.href = '/realtimecart';
    })
    .catch((error) => {
      console.error(error);
    });
}