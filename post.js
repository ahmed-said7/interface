const express=require('express');
const pool = require('./db');
const router=express.Router();

router.get('/',async function(req,res,next){
    const{rows}
    =await pool.query(`SELECT username,caption 
    FROM post JOIN users ON users.id=post.user_id`);
    res.render('public.ejs',{rows,keys:['username', 'caption']});
});
router.get('/comment',async function(req,res,next){
    const{rows}
    =await pool.query(`SELECT caption,content,username 
    FROM post JOIN comment ON post.id=comment.post_id JOIN
    users ON comment.user_id=users.id`);
    res.render('public',{rows,keys:['caption','content','username']});
});
router.get('/likes',async function(req,res,next){
    const{rows}
    =await pool.query(`SELECT caption,type,username 
    FROM post JOIN likes ON post.id=likes.post_id JOIN
    users ON likes.user_id=users.id`);
    res.render('public',{rows,keys:['caption','type','username']});
});
router.get('/hashtag',async function(req,res,next){
    // const{rows}
    // =await pool.query(`SELECT title,caption 
    // FROM post JOIN hashtag_post ON post.id=hashtag_post.post_id JOIN
    // hashtag ON hashtag_post.hashtag_id=hashtag.id`);
    const{rows}=await pool.query(`SELECT title FROM hashtag`);
    res.render('public.ejs',{rows,keys:['title']});
});
module.exports=router;