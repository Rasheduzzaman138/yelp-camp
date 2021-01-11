var express=require("express"),
    app=express(),
    bodyParser =require("body-parser"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    LocalStrategy=require("passport-local"),
    methodOverride=require("method-override"),//to update and edit and create
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    User=require("./models/user"),
    seedDB=require("./seeds");currentUser

var campgroundRoutes=require("./routes/campgrounds"),
    commentRoutes=require("./routes/comments"),
    authRoutes=require("./routes/index");
app.use(methodOverride("_method"));
// seedDB(); //seed the database
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret:"Rusty wins secret dog!!!",
    resave:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
mongoose.connect("mongodb://localhost:27017/yelp_camp_v10",{ useNewUrlParser: true,useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    next();
});
app.use(authRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);
app.listen(3000,function(){
    console.log("server listening in port 3000");
});