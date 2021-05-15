const users = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authantication = {};



////////////////////// Registration Authentication

authantication.regAuth = async (req, res, next) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (name && email && phone && work && password && cpassword) {
        if(password === cpassword){
        try {
            const data = await users.findOne({ email: email })
            if (data) { res.status(501).send("email already exist"); }
            else {
                 next(); }
        } catch {
            res.status(501).send("something wrong");
        }
        }else{
            res.status(501).send("password does not match");
        }

    } else {
        throw new Error("authentication Error");
    }
}

////////////////// Login Authentication

authantication.loginAuth = async (req, res, next) => {
    const { email, password } = req.body;
    if (email && password) {
        try {
            const data = await users.findOne({ email: email })
            if (data) { 
                const isMatch = await bcrypt.compare(password, data.password);
                if (!isMatch) { res.status(401).send("invalid credintial");}
                else { 
                    const token = await data.generateAuthToken();
                    res.cookie('jwtoken', token, { expires: new Date(Date.now() + 900000), httpOnly: true})
                    next();}
            }
            else { res.status(401).send("invalid credintial"); }
        } catch {
            res.status(501).send("something wrong");
        }

    } else {
        throw new Error("fill all entities");
    }
}



////////////////// Token Authentication
authantication.tokenAuth = async (req, res, next) => {
    try{
        const data = await users.findOne({ "tokens.token": req.cookies.jwtoken })
        if(data){
            next();
        }else{
            res.status(501).send("invalid credintial")
        }

    }catch{
        res.status(501).send("invalid credintial")
    }
}



module.exports = authantication;
