const users = require('../models/userSchema');
const router = require('express').Router();

router.route('/user')
.get(async(req,res)=>{
    try {
        const user = new users();
        const data = await users.find({}, { '_id': 0,'__v':0});
        res.send(data);
    } catch {
        res.status(501).send("something wrong");
    }
})
.post(async(req,res)=>{
    try {
        const user = new users(req.body);
        const data = await user.save();
        res.status(201).send(data);
    } catch{
        res.status(501).send("something wrong");
        
    }
})
.put((req,res)=>{
    res.send("hello PUT");
})
.delete((req,res)=>{
    res.send("hello DELETE");
})

module.exports = router;