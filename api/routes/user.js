const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

// router.get("/usertest",(req,res)=>{
//     res.send("user test is successful");
// })

// router.post("/userposttest",(req,res)=>{
//     const username = req.body.username;
//     console.log(username);
// })
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    if(req.body.password){
        req.body.password=CryptoJS.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            {
            $set : req.body
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted...");
    }
    catch(err){
        res.status(500).json(err);
    }
});



//GET USER
//only admin can get any user
router.get("/find/:id",verifyTokenAndAdmin, async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others}=user._doc;
        res.status(200).json(others);
    
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET ALL USERS
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    const query = req.query.new
    try{
        const users = query 
        ? await User.find().sort({_id:-1}).limit(5)
        : await User.find() ;
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET USER STATS

router.get("/stats",verifyTokenAndAdmin, async(req,res)=>{
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1));

    try{

        const data = await User.aggregate([
            {$match :{createdAt:{$gte:lastYear}}},
            {
                $project:{
                    month:{$month : "$createdAt"}
                },
            },
            {
                $group:{
                    _id:"$month",
                    total :{$sum:1},
    
                },
            }
            
        ]);
        res.status(201).json(data);

    }catch{
        res.status(500).json(err);
    }
})
//1.16.00

module.exports = router;