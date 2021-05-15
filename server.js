const express = require('express');
var cookieParser = require('cookie-parser')
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
require('./db/db_connection');
const userRouter = require('./routes/user');
const loginRouretr =require('./routes/login');
const regRouter = require('./routes/registration');
const privatetRouter = require('./routes/private');
const PORT = process.env.PORT;
app.use(cookieParser())
app.use(express.json());
app.use('/user',userRouter);
app.use('/login',loginRouretr);
app.use('/registration',regRouter);
app.use('/private', privatetRouter);



app.get('/',(req,res)=>{
    res.send('welcome to home page');
})

app.use((err,req,res,next)=>{
    if(err){
        res.status(402).send("Error");
    }
})


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});


