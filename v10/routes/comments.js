var express=require("express");
var router=express.Router();
var Campground=require("../models/campground");
var Comment=require("../models/comment"); 

//=============================
//COMMENTS ROUTES
//=============================
router.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    //FIND CAMPGROuND BY ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("newcomments",{campgrounds:campground});

        }
    });
});
router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    //lookup campground using ID
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            
            //create new comment
            Comment.create(req.body.comment,function(err,comment){
                //add username and id to comment and save comment
                comment.author.id=req.user._id;
                comment.author.username=req.user.username;
                

                comment.save();
               campground.comments.push(comment);
               campground.save();
               res.redirect("/campgrounds/"+campground._id);
           })
            //connect new comment to campground
            //redirect campground show page
        }
    })
  
});
//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports=router;