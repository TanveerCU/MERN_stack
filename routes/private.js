const users = require('../models/userSchema');
const privateRouter = require('express').Router();
const {tokenAuth } = require('../service/authentication');



privateRouter.route('/')
    .get(tokenAuth, (req, res) => {
        res.status(200).send("welcome to your private page");
    })

module.exports = privateRouter;