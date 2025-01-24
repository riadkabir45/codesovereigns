import express from 'express';
import pg from "pg";
// import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import env from "dotenv";

const app = express();
env.config();


//Connecting with database.
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT
    ,
});
db.connect();

// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// For showing login and register page
app.get('/login', (req, res) => {
    res.render("login.ejs");
});
app.get('/register', (req, res) => {
    res.render("register.ejs");
});

// For storing  and checking information in database
app.post("/register", async(req, res) => {
    const email = req.body.username; // saving user input email and password in constant email and password.
    const password = req.body.password;

    try{
        const checking = await db.query("select * from users where email = $1",[email]);
        // checking user already registered or not.
        if(checking.rows.length >0){
            res.send("You already have an account. Try log in.");
        }else{ // if not then save date in database.
            bcrypt.hash(password, 10, async (err, hash) => {  // using bcrypt for salting.
                if (err) {
                  console.error("Error hashing password:", err);
                } else {
                  await db.query(  //hash will be stored in database not password.
                    "INSERT INTO users (email, password) VALUES ($1, $2)",[email, hash]);
                  res.render("user.ejs");
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});


app.post("/login", async (req, res) => {
    const email = req.body.username; // saving user input email and password in constant email and password.
    const password = req.body.password;

    try{
        const checking = await db.query("select * from users where email = $1",[email]);
        // checking user is registered or not.
        if(checking.rows.length >0){ // if registered then compare storedpassword and given password.
            const storedpassword = checking.rows[0].password;
            // compare- first user given password will be converted into hash then compare with stored hash.
            bcrypt.compare(password, storedpassword, (err, result) => {
                if (err) {
                  console.error("Error comparing passwords:", err);
                } else {
                  if (result) {
                    res.render("user.ejs");
                  } else {
                    res.send("Incorrect Password");
                  }
                }
              });
        }else{ // If user is not registered.
            res.send("You are not registered. Please register first");
        }
    }catch(err){
        console.log(err);
    }
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});