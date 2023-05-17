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
mongoose.connect("mongodb://0.0.0.0:27017/todolist",{useNewUrlParser:true}).then(()=>console.log("connected mongodb successfully"));
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
const defaultItems=[];
const da=async()=>{ 
  const res=await Item.insertMany([{name:'hello'},{name:'hii'}]);
}
da();

app.get("/",async(req,res)=>
{ 
 const newList=await Item.find();
  Item.find({}).then((users)=>{
    users.forEach((Item)=> {
      console.log(Item.name);
      
    });
  })
  res.render("list",{listTitle:"today",newListItems:newList});
  });
  const ListSchema={
    name:String,
    items:[itemSchema]
  }
  const data= Item.find();
  const List=mongoose.model("List",ListSchema);
  app.post("/", function(req, res){
    const item = req.body.nxtitem;
    const submitTitle = req.body.list;
    const newItem = new Item({name:item});
    const oldItem=new List({name:item});
    const temp=[];
    if(submitTitle == "today"){
      newItem.save();
      res.redirect("/");
    }else{
          oldItem.save();
        res.redirect("/"+submitTitle);

    }
  });

   
app.post("/delete",(req,res)=>{
const checkboxItemId=req.body.name;
const {_id}=req.body;
Item.findOneAndDelete(checkboxItemId);
   
})
app.get("/:customTitle", function(req,res){
  const listCustomItem = req.params.customTitle;
  List.findOne({name:listCustomItem},function(err,foundItem){
    if(!err){
      if(!foundItem){
        const customLists = new List({
          name:listCustomItem,
          items:defaultItems
        })
        customLists.save();
        res.redirect("/"+listCustomItem); //to redirecting to the new created route
      }else{
        res.render("list", {listTitle:listCustomItem, newListItems:foundItem.items});
      }
    }
  })
});
app.listen(3080,function(req,res)
{
    console.log("server working well");
});