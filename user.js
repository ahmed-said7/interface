const express=require('express');
const router = express.Router();
const pool = require('./db');

router.get('/',async function(req,res,next){
    const {rows} =await pool.query(`SELECT * FROM users ORDER BY username,email`);
    res.render('users.ejs',{rows});
});
router.get('/follower',async function(req,res,next){
    const {rows} =await pool.query(`SELECT user_id,username AS follower FROM follower JOIN users ON
    users.id = follower.follower_id`);
    res.render('public',{rows,keys:['user_id','follower']});
});
router.get('/count-follower',async function(req,res,next){
    const {rows} =await pool.query(`SELECT username,COUNT(*) 
    FROM follower JOIN users ON
    users.id = follower.user_id GROUP BY users.username HAVING COUNT(*)>1`);
    // res.status(200).json({rows})
    res.render('public',{rows,keys:['username','count']});
});
module.exports=router;