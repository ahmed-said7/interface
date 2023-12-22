const pg=require('pg');
const pool=new pg.Pool({
    host:"localhost",
    database:"social",
    port:5432,
    user:"postgres",
    password:"ahmed79"
});

module.exports=pool;