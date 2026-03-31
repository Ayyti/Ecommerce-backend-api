// const express = require('express');
// const router = express.Router();
// const userModel =  require('../models/users.model');

// router.get('/', (req, res) => {
//     res.send("user Home Page");
// });

// router.post("/register", async function(req,res){
//     try {
//         let { email , password , fullname} = req.body;

//         let user = await userModel.create({
//             email,
//             password,
//             fullname
//         });
//         res.status(201).json(user);
//       res.send(user);

//     } catch (err) {
//         console.log(err.message);
        
//         res.status(500).json({ error: err.message });

//     }
// });


// module.exports = router;

const express = require('express');
const router = express.Router();
const userModel = require("../models/users.model"); // Why: To talk to the User collection in DB
const bcrypt = require("bcrypt"); // Why: To scramble the password for safety
const jwt = require("jsonwebtoken"); // Why: To create a token for the user to stay logged in
const { default: rateLimit } = require('express-rate-limit');
const   rateLimiter = require ('../utils/rate-limiter');
router.post("/register", async function (req, res) {
    try {
        let { email, password, fullname } = req.body;
        console.log(req.body);

        // 1. Check if user already exists so we don't have duplicates
        let user = await userModel.findOne({ email: email });
        if (user) return res.status(401).send("You already have an account, please login.");

        // 2. Scramble (Hash) the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
               

                // 3. Actually create the user in MongoDB
                let newUser = await userModel.create({
                    email,
                    password: hash,
                    fullname
                });

                let token = jwt.sign({ email: email, id: newUser._id }, process.env.JWT_KEY || "secretkey");

                // 2. Set the Cookie in the browser
                res.cookie("token", token);

                res.status(201).send("User created! Go check your MongoDB Compass/Atlas.");
            }

    catch(err) {
        console.log("REGISTER ERROR :", err.message);
        res.send(err.message);

}
});


// router.post("/Login", async function (req, res) {
//     let user = await userModel.findOne({ email: email});
//     if (!user)
//         return res.status(401).send(" you are not a registered user, please sign in first.");

//     bcrypt.compare(password, user.password, function (err, result) {
//         if (err)
//             return res.status(500).send("Server error, try again later.");
//         if (!result)
//             return res.status(401).send("Wrong password, try again.");
    
router.post("/login", async function (req, res) {
    try{
    let { email, password } = req.body;
    let user =  await userModel.findOne ({ email: email });
    if (!user) 
        return res.status(401).send("You are not a registered user, please sign in first.");


    const result = await bcrypt.compare(password,user.password);

    if(!result) return res.status(401).send("wrong password,try again");
    let token = jwt.sign({email:email ,id: user._id}, "secretkey");
    res.cookie("token",token);
    res.status(200).send("You are now logged in!");
}

catch{
    console.log("LOGIN ERROR:", err.message);
    res.status(501).send("Unknown error");
}

});

module.exports = router;
