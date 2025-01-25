import express from "express";// for server.
//import bodyParser from "body-parser";
import pg from "pg";// for database.
import bcrypt from "bcrypt";// for salting.
import passport from "passport";
import { Strategy } from "passport-local";
import session from "express-session";
import env from "dotenv"; // to use .env file

const app = express();
env.config();


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: process.env.SESSION_RESAVE,
        saveUninitialized: process.env.SESSION_SAVEUNINITIALIZED,
    })
);
// bodyparser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());
app.use(passport.session());

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



// For showing login and register page
app.get('/login', (req, res) => {
    res.render("login.ejs");
});
app.get('/register', (req, res) => {
    res.render("register.ejs");
});

// if user is authenticated (he prevoustly login and his information is saved as cookies) then only he can see the secrets page.
app.get("/user", (req, res) => {
    // console.log(req.user);
    if (req.isAuthenticated()) {
      res.render("user.ejs");
    } else {
      res.redirect("/login");
    }
  });

// passport.authenticate("local") is a middleware that authenticates the user using the local strategy.
// if the user is authenticated, it will redirect to the user page.
// if the user is not authenticated, it will redirect to the login page.
// the local strategy is defined bellow in the passport.use() function.
app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/user", // if callback function returns user then redirect to / user page.
      failureRedirect: "/login", // if callback function returns false then redirect to /login page.
    })
  );

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
                  const user = result.rows[0];
                  req.login(user, (err) => {
                    console.log("success");
                    res.redirect("/user");
                  });
                }
            });
        }
    }catch(err){
        console.log(err);
    }
});


passport.use( // local strategy is used to authenticate users using a username and password. 
    new Strategy(async function verify(username, password, cb) { // username and password are the fields that are sent from the login form.
      try { // In ejs file we have used name="username" and name="password" for username and password fields. this comes directly from there.
        const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
          username,
        ]);
        if (result.rows.length > 0) {
          const user = result.rows[0];
          const storedHashedPassword = user.password;
          bcrypt.compare(password, storedHashedPassword, (err, valid) => {
            if (err) {
              //Error with password check
              console.error("Error comparing passwords:", err);
              return cb(err);  // if there is an error in comparing password then return error to the callback function.
            } else {
              if (valid) {
                //Passed password check
                return cb(null, user); // if password is correct then return user to the callback function.
              } else {
                //Did not pass password check
                return cb(null, false); // if password is incorrect then return false to the callback function.
              }
            }
          });
        } else {
          return cb("User not found");
        }
      } catch (err) {
        console.log(err);
      }
    })
  );

  // serializeUser is a function that is called when a user logs in. It determines what data from the user object should be stored in the session.
passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  // deserializeUser is a function that is called when a user makes a request to the server. It determines what data from the session should be attached to the request object.
  passport.deserializeUser((user, cb) => {
    cb(null, user);
  });


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});