const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken")

//UPDATE
router.put("/update/:id",verify,async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt
                (req.body.password,
                    process.env.SECRET_KEY)
                .toString();
        }
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, 
                {$set :req.body},
                {new:true})
            res.status(200).json(updatedUser);

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("only can update your account")
    }
});

//DELETE
router.delete("/delete/:id",verify,async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted");

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You cannot delete this account as you are not authenticated")
    }
});

//GET
router.get("/find/:id",async (req, res) => {
        try {
           const user =  await User.findById(req.params.id)
           const {password, ...otherDetails} = user._doc;
            res.status(200).json(otherDetails);

        } catch (err) {
            res.status(500).json(err)
        }
});

//GET ALL
router.get("/findall",verify,async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query? await User.find().sort({_id:-1}).limit(10) : await User.find()
            res.status(200).json(users);

        } catch (err) {
            res.status(500).json(err)
        }
    }
    else {
        res.status(403).json("You cannot see all users as you are not admin")
    }
});

//GET USER STATS
router.get("/stats", async(req,res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear()-1);
    const monthsArray= [
        "january",
        "febuary",
        "march",
        "april",
        "may",
        "june",
        "july",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    try{
        const data = await User.aggregate([
            {
                $project:{
                    month : {$month : "$createdAt"}
                }
            },{
                $group:{
                    _id: "$month",
                    total : {$sum:1}
                }
            }
        ]);
        res.status(200).json(data);
    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
