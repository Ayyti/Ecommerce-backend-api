const express = require('express');
const router = express.Router();
const productModel = require ('../models/product.model');
const loggedIn = require("../utils/LoggedIn");


const ownerModel =  require('../models/owner.model');

// router.get('/', (req, res) => {
//     res.send("Owners Home Page");
// });

//if(process.env.NODE_ENV==='development'){
    router.post("/create", async function(req,res){

        let owners = await ownerModel.find();
        if(owners.length> 0){
            return res
            // .send(503)
            // .send("Owners already exist, you dont have permission ");
            .status(503).json({
                message: "Owners already exist, you dont have permission "});
        }
        
        let { fullname, email, password } = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,  
            password,
        });
        res.status(201).send(createdOwner);

       // res.send("Creating new Owner");

    });
//} 

//console.log("ROUTER FILE LOADED");
//if(process.env)

router.post("/create-product", async (req, res) => {
    try {
    let { image, name, price, discount, bgcolor, panelcolor, textcolor, quantity, product_description } = req.body;
 
    let createdProduct = await productModel.create({
        image,
        name,
        price,
        discount,
        bgcolor, 
        quantity,
        
    });


    res.status(201).send("Product created successfully");   
    } catch (err) {
        res.status(500).send("Server error, try again later.");
    }   

})


module.exports = router;
