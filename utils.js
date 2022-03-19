const fs = require('fs')
const {resolve} = require('path')


// FUNCTION THAT READS THE PRODUCTS SENT TO THE BODY
function writeDataToFile(filename, content){
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) =>{
        if(err){
            console.log(err)
        }
    })

}

// FUNCTION TO POST A PRODUCT
function getPostData(req){
    return new Promise ((resolve, reject) => {
        try{
            let body = " "

            req.on("data", (chunk) =>{
                body += chunk.toString()
            })

            req.on("end", () => {
                resolve(body)

            })

        }catch(error){
            reject(err)
        }
    

    })
}

module.exports = { writeDataToFile, getPostData }