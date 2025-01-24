import express from 'express';
import pg from "pg";
// import bodyParser from "body-parser";

const app = express();
//Connecting with database.
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "tech",
    password: "12345678",
    port: 5432,
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
            await db.query("insert into users (email, password) values ($1, $2)",[email, password]);
            res.render("user.ejs");
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

            if(password === storedpassword){
                res.render("user.ejs");
            }else{
                res.send("Incorrect Pasword");
            }
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