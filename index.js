const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app= express();
const insertRouter=require('./insert');
const userRouter=require('./user');
const postRouter=require('./post');
const tagRouter=require('./tag');
const hashtagRouter=require('./hashtag');
const queryRouter=require('./query');

app.use(bodyParser.urlencoded({ extended:true}));
app.use(cors({origin:"*"}));
app.set('view engine','ejs');

app.use('/insert',insertRouter);
app.use('/user',userRouter);
app.use('/post',postRouter);
app.use('/tag',tagRouter);
app.use('/hashtag',hashtagRouter);
app.use('/query',queryRouter);
app.get('/home',(req,res,next)=> res.render('home'));
app.listen(4000,()=>{
    console.log('listening to server requests...');
});