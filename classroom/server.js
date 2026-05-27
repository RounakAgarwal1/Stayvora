const express = require("express");
const app = express();
const users = require("./routes/user");
const posts = require("./routes/post");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions = {
    secret: 'mysupersecretstring',
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
res.locals.successMsg = req.flash("success");
    res.locals.errorMsg  = req.flash("error");
    next();
})

//Express Storing & Session info
app.get("/register", (req, res) => {
    let { name = "anonymous" } = req.query;
    req.session.name = name;
    // console.log(name);
    if (name === "anonymous") {
        req.flash("error", "user not registered");
    } else {
        req.flash("success", "user registered successfully");
    }
    res.redirect("/hello");
});

app.get("/hello", (req, res) => {
    // res.send(`hello ,${req.session.name}`);
    // console.log(req.flash("success"));
    res.render("page.ejs", { name: req.session.name });
});

//Express Sessions
// app.get("/reqcount", (req, res) => {
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You sent a request ${req.session.count} times`);

// })

app.get("/test", (req, res) => {
    res.send("Test successfull");
})

//cookie Parser for reading
// app.use(cookieParser());

// app.use("/users",users);
// app.use("/posts",posts);

// //cookie
// app.get("/", (req, res) => {
//     console.dir(req.cookies);
//     res.send("Hi I am Root!");
// });

// app.get("/greet", (req, res) => {
//    let {name="anonymous"}=req.cookies;
//     res.send(`Hi ${name}`);
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("origin","India");
//     // res.cookie("greet","hello");
//     res.send("sent you a cookie!");
// });

// app.use(cookieParser("secretcode"))
// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie sent");
// })

// app.get("/verify",(req,res)=>{
// console.log(req.signedCookies);
// res.send("verified");
// });

app.listen(3000, () => {
    console.log("server is listening to 3000")
});
