const Cart = require("../models/Cart");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifytoken");

const router = require("express").Router();

//CREATE

router.post('/',verifyToken,async (req,res)=>{
    const newCart = new Cart(req.body);

    try{
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);

    }catch(err){
        res.status(500).json(err);
    }
})


//UPDATE
router.put("/:id",verifyToken,async(req,res)=>{
    try{
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, 
            {
            $set : req.body
            },
            {new:true}
        );
        res.status(200).json(updatedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//DELETE
router.delete("/:id",verifyTokenAndAuthorization, async(req,res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been removed...");
    }
    catch(err){
        res.status(500).json(err);
    }
});



//GET USER CART

router.get("/find/:userId", async(req,res)=>{
    try{
        const cart = await Cart.findOne({userId:req.params.userId});
        res.status(200).json(cart);
    
    }
    catch(err){
        res.status(500).json(err);
    }
});

//GET ALL 
router.get("/",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const carts =await Cart.find();
        res.status(200).json(carts);

    }catch(err){
        res.status(500).json(err);
    }
})



module.exports = router;

// router.get("/usertest",(req,res)=>{
//     res.send("user test is successful");
// })

// router.post("/userposttest",(req,res)=>{
//     const username = req.body.username;
//     console.log(username);
// })