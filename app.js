if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGOURL = 'mongodb://127.0.0.1:27017/wonderlust';
const ExpressError = require("./utils/expressError.js");
const listingRoute = require("./routes/listing.js");
const reviewRoute = require("./routes/review.js");
const userRoute = require("./routes/user.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy  = require("passport-local");
const User = require("./models/user.js");
const http = require("http");
let  dbUrl = process.env.ATLASDB_URL;
console.log(dbUrl);

const port = 3000;

async function main() {
    await mongoose.connect(dbUrl);
};

main().then(() => {
    console.log("Connection successful");
}).catch((err) => {
    console.log(err)
});


const app = express();
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));


const store = MongoStore.create(
    {
        mongoUrl: dbUrl,
        crypto:{
            secret: process.env.SECRET,
        },
        touchAfter: 24*3600,
    }
);

const sessionOption = {
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge :  7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};

store.on("error",() => {
    console.log("ERROR in MONGO SESSION STORE",err)

})

app.use(session(sessionOption));
app.use(flash());

//Authentication middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email:"nishantrawani668@gmail.com",
//         username:"nishant@24",
//     });
//     let registeredUser = await User.register(fakeUser,"nishant@24");
//     res.send(registeredUser);

// });
// //listing route middleware
app.use("/listings",listingRoute);

//reviews route middleware
app.use("/listings/:id/reviews",reviewRoute);

//User route middleware
app.use("/",userRoute);
//unknown page middleware
app.all("*", (Req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

//error handiling middleware


app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(port, () => {
    console.log(`server is workking in ${port}`);

});


