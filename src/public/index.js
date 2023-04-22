const ProductManager = require("../classes/ProductManager")

let realTimeProductList = document.getElementById("real-time-product-list")
let addProductButton =  document.getElementById("add-product-button")

let productManager = new ProductManager()
const socket = io()

console.log('index.js !!')

socket.on('newProductAdded', updatedProductList => {
    let listContent = ""
    for (let i = 0; i < updatedProductList.length ; i++){
        listContent = listContent + `<li>${updatedProductList.title}</li>`
    }   
    realTimeProductList.innerHTML = listContent
})

addProductButton.addEventListener('click', evn =>{
    evn.preventDefault()
})

