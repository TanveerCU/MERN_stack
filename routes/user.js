const users = require('../models/userSchema');
const userRouter = require('express').Router();
const { tokenAuth } = require('../service/authentication');

userRouter.route('/')
    .get(tokenAuth,async(req,res)=>{
    try {
        const user = new users();
        const data = await users.find({}, { '_id': 0,'__v':0, 'password':0, 'tokens':0});
        res.send(data);
    } catch {
        res.status(501).send("something wrong");
    }
})

module.exports = userRouter;