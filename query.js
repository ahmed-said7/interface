const express=require('express');
const router = express.Router();
const pool = require('./db');
router.get('/',async function(req,res,next){
    const {query}=req.query;
    const {rows} =await pool.query(query);
    console.log(rows)
    if(rows.length == 0){
        res.render('notFound');
    }
    let keys = Object.keys(rows[0]);
    res.render('public.ejs',{rows,keys});
});
router.get('/page',async function(req,res,next){
    res.render('query.ejs');
});
module.exports=router;