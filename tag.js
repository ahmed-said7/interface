const express=require('express');
const router = express.Router();
const pool = require('./db');
router.get('/photo',async function(req,res,next){
    const {rows} =await pool.query(`SELECT x,y,username,post_id 
    FROM photo_tag JOIN users
    ON users.id = photo_tag.user_id`);
    res.render('users.ejs',{rows,keys:['x','y','username','post_id']});
});
router.get('/caption',async function(req,res,next){
    const {rows} =await pool.query(`SELECT username,post_id 
    FROM caption_tag JOIN users
    ON users.id = caption_tag.user_id`);
    res.render('users.ejs',{rows,keys:['username','post_id']});
});
module.exports=router;