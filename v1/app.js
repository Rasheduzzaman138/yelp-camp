var express=require("express");
var app=express();
var bodyParser =require("body-parser");
var campground=[
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"},
    {name:"There is no way to escape",image:"https://images.all-free-download.com/images/graphicthumb/goa_small_bird_202958.jpg"}
]
app.use(bodyParser.urlencoded({extended:true}));

app.set("view engine","ejs");
app.get("/",function(req,res){
    res.render("landing");
});
app.get("/campgrounds",function(req,res){
    
    res.render("campground",{campground: campground});
});
app.post("/campgrounds",function(req,res){
    //get data from form and add data to campground array
    var name=req.body.name;
    var image=req.body.image;
    var newCampground={name: name,image: image};
    campground.push(newCampground);
    //redirect to campground page
    res.redirect("/campgrounds");
});
app.get("/campgrounds/new",function(req,res){
    res.render("new");
})
app.listen(3000,function(){
    console.log("server listening in port 3000");
});