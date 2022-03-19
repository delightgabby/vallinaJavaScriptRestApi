const Product = require('../models/productmodel')


const {getPostData} = require('../utils')

//Gets All products
// @Route GET /api/products

async function getProducts(req, res){
    try{
        const products = await Product.findAll()

        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(products))

    }catch (error){
        console.log(error)
    }

}

//Gets Single product
// @Route GET /api/product/:id
async function getProduct(req, res, id){
    try{
        const product = await Product.findById(id)

        if (!product){
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'product not found'}))

        } else{
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify(product))
        }

    }catch (error)  {
        console.log(error)
    }

}

// Create a product and then POST/POSTMAN
// @Route POST /api/products
async function createProduct(req, res){
    try{

        const body = await getPostData(req)

        const {productName, Cost, expiryDate} = JSON.parse(body)

        const product = {
            productName,
            Cost,
            expiryDate
           }

        const newProduct = await Product.create(product)

        res.writeHead(201,{'content-Type': 'application/json'})
        return res.end(JSON.stringify(newProduct))

    }catch (error){
        console.log(error)
    }

}

// UPDATE a product WHICH PUT/PATCH POSTMAN BY ID
// @Route PUT/PATCH /api/products/:id
async function updateProduct(req, res, id){
    try{
// FIND THE PRODUCT IF IT EXIT
        const product = await Product.findById(id)

        if (!product){
         res.writeHead(404, {'Content-Type': 'application/json'})
         res.end(JSON.stringify({message: 'product not found'}))
        }else {

            const body = await getPostData(req)

            const {productName, Cost, expiryDate} = JSON.parse(body)
    
            const productData = {
                productName: productName || product.productName,
                Cost: Cost || product.Cost,
                expiryDate: expiryDate || product.expiryDate
               }
    
            const updateProduct = await Product.update(id, productData)
    
            res.writeHead(200,{'content-Type': 'application/json'})
            return res.end(JSON.stringify(updateProduct))
    
        }

       
    }catch (error){
        console.log(error)
    }

}

module.exports = { getProducts, getProduct, createProduct, updateProduct }