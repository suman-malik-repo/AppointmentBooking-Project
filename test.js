let express = require("express");
let path = require("path");

let app = express();
let publicPath = path.join(__dirname,"/public");

app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.send("Hello");
})

app.get("/profile",(req,res)=>{
    let user = {name:"Suman Malik", age:"20"}
    res.render("abc",{user});
})
app.get("/mydata",(req,res)=>{
    let user = {name:"Suman Malik", age:"20",}
    res.render("mybooking",{user});
})
app.listen(3500);