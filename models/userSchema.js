const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]

    
});


//////////////////////////// Hashing password

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,10);
    }
    next();
});

/////////////////////// generating Token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    }catch(err){
        throw new Error("Authentication Error");
    }
}

const users = mongoose.model('user', userSchema);
module.exports = users;