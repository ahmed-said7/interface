const pool= require("./db");
const createTables=async () => {
    try{
    await pool.query(`CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        username VARCHAR(30) NOT NULL,
        bio VARCHAR(100)  
        ,status VARCHAR(25)  , phone VARCHAR(25) 
        ,email VARCHAR(60)  
        ,password  VARCHAR(60) NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CHECK( COALESCE( phone , email ) IS NOT NULL )
        )`);
    await pool.query(`CREATE TABLE post (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        url VARCHAR(200) NOT NULL,
        caption VARCHAR(200),
        lat FLOAT CHECK( lat IS NULL OR ( lat >= -90 AND lat <= 90 ) )
        ,lng FLOAT CHECK( lng IS NULL OR ( lng >= -180 AND lng <= 180 ) ),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE comment (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        content VARCHAR(240),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        )`);
    await pool.query(`CREATE TABLE photo_tags (
        id SERIAL PRIMARY KEY,
        x INTEGER NOT NULL, y INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        post_id INTEGER NOT NULL REFERENCES post(id)  ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id)  ON DELETE CASCADE
        )`)
    await pool.query(`CREATE TABLE caption_tags (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
        ,UNIQUE(user_id,post_id)
        )`)
    await pool.query(`CREATE TABLE hashtag (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULt CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULt CURRENT_TIMESTAMP,
        title VARCHAR(200) UNIQUE
    )`);
    await pool.query(`CREATE TABLE likes (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        type VARCHAR(13),
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        post_id INTEGER REFERENCES post(id),
        user_id INTEGER REFERENCES users(id),
        comment_id INTEGER REFERENCES comment(id),
        check( COALESCE(post_id::BOOLEAN::INTEGER,0) + COALESCE(comment_id::BOOLEAN::INTEGER,0) = 1 ),
        UNIQUE(user_id,comment_id,post_id)
        )`);
    await pool.query(`CREATE TABLE hashtag_post (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        hashtag_id INTEGER NOT NULL REFERENCES hashtag(id) ON DELETE CASCADE,
        post_id INTEGER NOT NULL REFERENCES post(id) ON DELETE CASCADE,
        UNIQUE(hashtag_id,post_id)
        )`);
    await pool.query(`CREATE TABLE follower (
        id SERIAL PRIMARY KEY,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        follower_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        UNIQUE(user_id,follower_id)
        )`);
    }catch(e){
        console.log(e);
    };
};
// you should run command line "node tables.js create"

if(process.argv[2]== 'create'){
    createTables();
};

