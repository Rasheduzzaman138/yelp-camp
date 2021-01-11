var mongoose=require("mongoose"),
    Campground=require("./models/campground"),
    Comment=require("./models/comment"),
    data=[
        {
            name:"Camping on hill",
            image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        },
        {
            name:"Camping on hill",
            image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }, 
        {
            name:"Camping on hill",
            image:"https://images.pexels.com/photos/699558/pexels-photo-699558.jpeg?auto=compress&cs=tinysrgb&h=350",
            description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
        }
    ];
function seedDB(){
    //remove all the  campground
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }else{
            console.log("Removed all the items");
            data.forEach(function(seed){
                Campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else{
                    console.log("added a campground ");
                    Comment.create({
                        text:"This place is great,but I wish there was an internet!!!",
                        author:"Homer"
                    },function(err,comment){
                        if(err){
                            console.log(err);
                        }else{

                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment")
                        }
                    })
                }
                });
                });
        }
    }) ;
    //add a few campground 

    //add a few comment

}
   module.exports=seedDB;