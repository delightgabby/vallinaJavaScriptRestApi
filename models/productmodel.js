const products = require('../data/products.json')
const {v4: uuidv4} = require('uuid')

const {writeDataToFile} = require('../utils')

// function to GET ALL PRODUCTS
function findAll() {
    return new Promise ((resolve, reject) =>{
        resolve (products)
        
    });
}

// function to GET SINGLE PRODUCT BY ID
function findById(id) {
    return new Promise ((resolve, reject) =>{
       const product = products.find((p) => p.id === id)
       resolve (product)
        
    });
}

// function to CREATE PRODUCT 
function create(product) {
    return new Promise ((resolve, reject) =>{
       const newProduct = {id: uuidv4(), ...product}
       products.push(newProduct)
       writeDataToFile('./data/products.json', products)
       resolve(newProduct)
   
        
    });
}

// function to UPDATE PRODUCT by ID AND INDEX POSITION
function update(id, product) {
    return new Promise ((resolve, reject) =>{
       const index = products.findIndex((p) => p.id === id)
       products[index] = {id, ...products}
       writeDataToFile(index)
   
    });
}



module.exports = { findAll, findById, create, update }
