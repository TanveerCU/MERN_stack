const users = require('../models/userSchema');
const loginRouter = require('express').Router();
const {loginAuth} = require('../service/authentication');


loginRouter.route('/')
    .post(loginAuth, (req, res) => {
        res.status(200).send("loged In");
    })

module.exports = loginRouter;