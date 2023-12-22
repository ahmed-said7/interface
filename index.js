const express = require('express');
const app= express();
const insertRouter=require('./insert');
const userRouter=require('./user');
const postRouter=require('./post');
app.use(express.json());

app.use('/insert',insertRouter);
app.use('/user',userRouter);
app.use('/post',postRouter);


app.listen(4000,()=>{
    console.log('listening to server requests...');
});