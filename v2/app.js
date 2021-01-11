var express=require("express"),
    app=express(),
    bodyParser =require("body-parser"),
    mongoose=require("mongoose")
//     campground=[
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
//     {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"}
// ]
mongoose.connect("mongodb://localhost:27017/yelp_camp",{ useNewUrlParser: true,useUnifiedTopology: true });
//SET SCHEMA
var campgroundSchema=new mongoose.Schema({
    name:String,
    image:String,
    description:String
})
var Campground=mongoose.model("Campground",campgroundSchema);
// Campground.create({
//     name:"IN the edge of the sea",
//     image:"https://images.pexels.com/photos/5818621/pexels-photo-5818621.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
//     description:"This is the age of the sea for living well , For good looking sunset and sun rise it is the best place to pickup"
// },function(err,campground){
//     if(err){
//         console.log("SOMETHING WENT WRONG");
//         console.log(err)
//     }
//     else{
//         console.log("CAMPGROUND INSERTED SUCCESSFULLY");
//         console.log(campground);
//     }
// })

app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("landing");
});
//INDEX ROUTE----show all campgrounds
app.get("/campgrounds",function(req,res){
    //GET ALL CAMPGROUNDS FROM DB
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campground",{campground:allCampgrounds})
        }
    })
    // res.render("campground",{campground: campground});
});
//CREATE ROUTE----- ADD NEW CAMPGROUND TO DB
app.post("/campgrounds",function(req,res){
    //get data from form and add data to campground array
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description; 
    var newCampground={name: name,image: image,description: desc};
    // campground.push(newCampground);
    //Create a new campground and save to database
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log(err);
        }
        else{
        //redirect to campground page
        res.redirect("/campgrounds");
        }
    })
    
});
//NEW----show form to create new campground
app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
//SHOW -- show more info about one campground
app.get("/campgrounds/:id",function(req,res){
    //FIND THE CAMPGROUND WITH PROVIDED ID
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            console.log(err);
        }
        else{
          res.render("show",{campgrounds:foundCampground});  
        }
    })
    //RENDER SHOW TEMPLATE WITH THAT CAMPGROUND
    
})
app.listen(3000,function(){
    console.log("server listening in port 3000");
});