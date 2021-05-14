const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const express = require('express');
const app = express();
const userRouter = require('./routes/userRoute');
require('./db/db_connection');
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);


app.get('/',(req,res)=>{
    res.send('welcome to home page');
})


app.listen(PORT,()=>{
    console.log(`server is running at port ${PORT}`);
});