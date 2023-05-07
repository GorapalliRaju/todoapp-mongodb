const express=require("express");
const app=express();
const mongoose=require("mongoose");
app.set('view engine','ejs');
let items=["buy food","cook food","eat food"];
const bodyparser=require("body-parser");
//const mongoose=require("mongoose");
app.use(express.urlencoded({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://raju:raju@cluster0.g7a0llf.mongodb.net/todolist",{useNewUrlParser:true}).then(()=>console.log("connected mongodb successfully"));
const itemSchema=new mongoose.Schema({
    name:String,

});
const Item=new mongoose.model("item",itemSchema);
const item1=new Item({
    name:"welcome:"
});
const item2=new Item({
    name:"hit+button to add new item:"
});
const item3=new Item({
    name:"<--hit this to delete an item."
});
const defaultItems=[item1,item2,item3];
const da=async()=>{ 
  const res=await Item.insertMany([{name:'hello'},{name:'hii'}]);
}
da();
app.get("/",async(req,res)=>
{ 
 const data=await Item.find();
  Item.find({}).then((users)=>{
    users.forEach((Item)=> {
      console.log(Item.name);
      
    });
  })
  res.render("list",{data});
  });
app.post("/",async(req,res)=>
{
     item=req.body.nxtitem;
   const newData = new Item({name:item});

  // Save the document to the database
  newData.save().then((savedData)=>{console.log("saved");})
  .catch((err)=>{console.error(err);
  });
    res.redirect("/");
  });

app.post("/delete",(req,res)=>{
const checkboxItemId=req.body.name;
const {_id}=req.body;
Item.findOneAndDelete(_id)
.then(() => res.send('Document deleted'))
.catch((err) => {
  console.error(err);
  res.status(500).send('Error deleting document');
});
   
})
const ListSchema={
  name:String,
  items:[itemSchema]
}
const data= Item.find();
const List=mongoose.model("List",ListSchema);
app.get("/:customListName",(req,res)=>{
  const customList=req.params.customListName;
  List.findOne({name:customList}).then((err,hello)=>{
   if(!err)
   {
    if(!hello)
    {
      const d=new List({
        name:customList,
        items:defaultItems
       });
      
       d.save();
    }
   }
   else{
    console.log("already there");
    const data=async()=>{ 
      const res=await List.insertMany([{name:'hello'},{name:'hii'}]);
    }
    data();
    //res.render("hii",{data});
   }
  })
  
  .catch((err)=>{
    //
    
    console.log("doesnot exist")});
    
    //res.send("not");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3080;
}
app.listen(3080,function(req,res)
{
    console.log("server working well");
});