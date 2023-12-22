const express=require('express');
const pool = require('./db');
const router=express.Router();

router.post('/post',async function(req,res,next){
    const {lat,lng,user_id,caption,url}=req.body;
    await pool.query(`INSERT INTO post (lat,lng,user_id,caption,url) 
    VALUES ($1,$2,$3,$4,$5)`,[lat,lng,user_id,caption,url]);
    res.status(201).json({status: 'success'});
});
router.post('/user',async function(req,res,next){
    const {password,phone,email,status,bio,username}=req.body;
    await pool.query(`INSERT INTO users 
    (password,phone,email,status,bio,username) 
    VALUES ($1,$2,$3,$4,$5,$6)`,[password,phone,email,status,bio,username]);
    res.status(201).json({status: 'success'});
});
router.post('/hashtag',async function(req,res,next){
    const {title}=req.body;
    await pool.query(`INSERT INTO hashtag
    (title) 
    VALUES ($1)`,[title]);
    res.status(201).json({status: 'success'});
});
router.post('/comment',async function(req,res,next){
    const {post_id,user_id,content}=req.body;
    await pool.query(`INSERT INTO comment
    (post_id,user_id,content) 
    VALUES ($1,$2,$3)`,[post_id,user_id,content]);
    res.status(201).json({status: 'successs'});
});
router.post('/follower',async function(req,res,next){
    const {follower_id,user_id}=req.body;
    await pool.query(`INSERT INTO follower
    (follower_id,user_id) 
    VALUES ($1,$2)`,[follower_id,user_id]);
    res.status(201).json({status: 'successs'});
});
router.post('/photo-tag',async function(req,res,next){
    const {post_id,user_id,x,y}=req.body;
    await pool.query(`INSERT INTO photo_tags
    (post_id,user_id,x,y) 
    VALUES ($1,$2,$3,$4)`,[post_id,user_id,x,y]);
    res.status(201).json({status: 'successs'});
});
router.post('/caption-tag',async function(req,res,next){
    const {post_id,user_id}=req.body;
    await pool.query(`INSERT INTO caption_tags
    (post_id,user_id) 
    VALUES ($1,$2)`,[post_id,user_id]);
    res.status(201).json({status: 'successs'});
});
router.post('/likes',async function(req,res,next){
    const {post_id,user_id,comment_id}=req.body;
    await pool.query(`INSERT INTO likes
    (post_id,user_id,comment_id) 
    VALUES ($1,$2,$3)`,[post_id,user_id,comment_id]);
    res.status(201).json({status: 'successs'});
});
router.post('/hashtag-post',async function(req,res,next){
    const {post_id,hashtag_id}=req.body;
    await pool.query(`INSERT INTO hashtag_post
    (post_id,hashtag_id) 
    VALUES ($1,$2)`,[post_id,hashtag_id]);
    res.status(201).json({status: 'successs'});
});

module.exports=router;