var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
//INDEX ROUTE----show all campgrounds
router.get("/campgrounds", function (req, res) {

    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campground", { campground: allCampgrounds, currentUser: req.user })
        }
    })
    // res.render("campground",{campground: campground});
});
//CREATE ROUTE----- ADD NEW CAMPGROUND TO DB
router.post("/campgrounds", isLoggedIn, function (req, res) {

    //get data from form and add data to campground array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newCampground = { name: name, image: image, description: desc, author: author };

    // campground.push(newCampground);
    //Create a new campground and save to database
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        }
        else {
            //redirect to campground page
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })

});
//NEW----show form to create new campground
router.get("/campgrounds/new", isLoggedIn, function (req, res) {
    res.render("new");
})
//SHOW -- show more info about one campground
router.get("/campgrounds/:id", function (req, res) {
    //FIND THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(foundCampground)
            res.render("show", { campgrounds: foundCampground });
        }
    })
    //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND

});
//EDIT CAMPGOUND  ROUTE
router.get("/campgrounds/:id/edit",checkCampgroundOwnership, function (req, res) { 
        Campground.findById(req.params.id, function (err, foundCampground) {
            res.render("edit",{campground:foundCampground});
        });
        //OTHERWISE REDIRECT TO SOMEWHERE
        //IF NOT REDIRECT SOMEWHERE
        // Campground.findById(req.params.id, function (err, foundCampground) {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.render("edit", { campground: foundCampground });
        //     };
        // });
});
//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id",checkCampgroundOwnership, function (req, res) {
    //find and update the current campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(showpage)
});
//DESTROY CAMPGROUND ROUTE
router.delete("/campgrounds/:id",checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});
//middleware
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}
function checkCampgroundOwnership(req,res,next){
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function (err, foundCampground) {
            if (err) {
                res.redirect("back")
            } else {
                //DOES THE USER OWN THE CAMPGROUND?
                // console.log(foundCampground.author.id);//mongoose object 
                // console.log(req.user._id);//string
                if(foundCampground.author.id.equals(req.user._id)){

                    next();
                }else{
                    res.redirect("back");
                }
            };
        });
    }
    else {
           res.redirect("back");
        }
}
module.exports = router;