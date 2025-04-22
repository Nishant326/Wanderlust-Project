const User = require("../models/user.js");

module.exports.renderSignUp = (req,res)=>{
    res.render("user/signup.ejs");
};

module.exports.signUpUser = async(req,res)=>{
    try {
    let {email,username,password} = req.body;
    const newUser = new User({
        email,username
    });
    const registerdUser =  await User.register(newUser,password);
    console.log(registerdUser);
    req.login(registerdUser,(err)=>{
        if(err){
            return  next(err);
        }
        req.flash("success","Welcome to Wanderlust");
        res.redirect("/listings")
    });
}catch(err){
    req.flash("error",err.message);
    res.redirect("/signup");
};
};

module.exports.renderLogin = (req,res)=>{
    res.render("user/login.ejs");
};

module.exports.loginUser = async(req,res)=>{
    req.flash("success","Welcome to Wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err) {
        return next(err);
        };
        req.flash("success","You are logged out!");
        res.redirect("/listings");
    });
};