const users = require('../models/userSchema');
const registrationRouter = require('express').Router();
const { regAuth } = require('../service/authentication');


registrationRouter.route('/')
    .post(regAuth,async (req, res) => {
        try {
            const { name, email, phone, work, password} = req.body;
            const user = new users({ name, email, phone, work, password });
            const data = await user.save();
            res.status(201).send("registration completed successfully");
        } catch {
            res.status(501).send("something wrong");

        }
    })


module.exports = registrationRouter;