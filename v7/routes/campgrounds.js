var express= require("express");
var router=express.Router();
var Campground=require("../models/campground");
//INDEX ROUTE----show all campgrounds
router.get("/campgrounds",function(req,res){
    
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground",{campground:allCampgrounds,currentUser:req.user})
        }
    })
    // res.render("campground",{campground: campground});
});
//CREATE ROUTE----- ADD NEW CAMPGROUND TO DB
router.post("/campgrounds",isLoggedIn,function(req,res){
    
    //get data from form and add data to campground array
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    } ;
    var newCampground={name: name,image: image,description: desc,author:author};
   
    // campground.push(newCampground);
    //Create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
        //redirect to campground page
        console.log(newlyCreated);
        res.redirect("/campgrounds");
        }
    })
    
});
//NEW----show form to create new campground
router.get("/campgrounds/new",isLoggedIn,function(req,res){
    res.render("new");
})
//SHOW -- show more info about one campground
router.get("/campgrounds/:id",function(req,res){
    //FIND THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
            console.log(foundCampground)
            res.render("show",{campgrounds:foundCampground});  
        }
    })
    //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
    
})
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;