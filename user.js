const express=require('express');
const pool = require('./db');
const router=express.Router();
router.get('/',async function(req,res,next){
    const {rows} =await pool.query(`SELECT * FROM users ORDER BY username,email`);
    res.status(201).json({status: 'success',rows});
});
router.get('/follower',async function(req,res,next){
    const {rows} =await pool.query(`SELECT * FROM follower JOIN users ON
    users.id = follower.follower_id WHERE follower.user_id =${1}`);
    res.status(201).json({status: 'success',rows});
});
router.get('/count-follower',async function(req,res,next){
    const {rows} =await pool.query(`SELECT username,COUNT(*) 
    FROM follower JOIN users ON
    users.id = follower.user_id GROUP BY follower.user_id HAVING COUNT(*)>=1`);
    res.status(201).json({status: 'success',rows});
});
module.exports=router;