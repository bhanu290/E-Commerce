const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

router.post("/register",async (req,res)=>{
    //check for any missing values in the input of 3
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        password:CryptoJS.AES.encrypt(req.body.password,
             process.env.PASS_SEC
             ).toString(),
    });
    // console.log(newUser);
    try{
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    }
     catch(err){
        res.status(500).json(err);
     }
});

//Login

router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({username:req.body.username});
        if (!user) {
            res.status(401).json("Wrong Credentials!");
            return;
        }
        const hashedPassword =CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
            );
        const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);  
        if (Originalpassword !== req.body.password) {
            res.status(401).json("Wrong Credentials!");
            return;
        }

        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin,

        },process.env.JWT_SEC,
        {expiresIn:"3d"}
        );
        
        const { password, ...others } = user._doc;
        

        res.status(200).json({...others,accessToken});

    }catch(err){
        res.status(500).json(err)
    }
     
})


 module.exports = router


// const router = require("express").Router();
// const User = require("../models/User");
// const CryptoJS = require("crypto-js");
// const jwt = require("jsonwebtoken");
// //Register
// router.post("/register",async(req,res)=>{
//     //if() for any missing values then u can set status code 400 and request to enter username or password
//     const newUser = new User({
//         username: req.body.username,
//         email: req.body.email,
//         password:CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
//     });
//     try{
//         const savedUser = await newUser.save();
//         console.log("savedUser: ", savedUser);
//         res.status(201).json(savedUser);

//     }
//     catch(err){
//         res.status(500).json(err);
//         // console.log("error");
//     }
    
// });

// //login
// router.post("/login",async(req,res)=>{
    
//     try{
//         const user = await User.findOne({
//             username:req.body.username,
//         });
//         !user && res.status(401).json("Wrong Credentials");//if there is no user


//         const hashedPasword = CryptoJS.AES.decrypt(
//             user.password,
//             process.env.PASS_SEC
//         );
//         const Originalpassword = hashedPasword.toString(CryptoJS.enc.Utf8);    
//         // if wrong password
//         Originalpassword != req.body.password 
//                     && res.status(401).json("Wrong Credentials");

//         const accessToken = jwt.sign({
//             id:user._id,
//             isAdmin: user.isAdmin
//         },process.env.JWT_SEC,
//         {expiresIn:"3d"}//this token will expire in 3 days
//         );
//         //spread operator: destructure our user password from others
//         const {password, ...others}=user._doc;


//         //else if everything is ok return user
//         res.status(200).json({...others,accessToken});
//     }
//     catch(err){
//         res.status(500).json(err);
//     }
// });

// module.exports = router;

// //jwt: json web token : verifying our users and provide them
// // jwt after login so that whenever they try to make any request
// //we just veryfy if that belongs to client or not