const express=require('express');
const pool = require('./db');
const router = express.Router();
router.get('/',async function(req,res,next){
    const {rows} =await pool.query(`SELECT title,caption 
    FROM hashtag_post JOIN hashtag
    ON hashtag.id = hashtag_post.hashtag_id
    JOIN post ON post.id = hashtag_post.post_id`);
    res.render('users.ejs',{rows,keys:['title','caption']});
});
module.exports=router;