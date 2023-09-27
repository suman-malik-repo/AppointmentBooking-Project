const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");

app.use(express.urlencoded()); // midleware

const pubFolder = path.join(__dirname,"/public");


const db = mysql.createConnection({
    host: "localhost",
    user: "user",
    passwor: "123456"
});

db.connect((err)=>{
    if(err){
        console.log("not connected to database");
        
    }
    else{
        console.log("connected successfully")
    }
})


app.get("/",(req,res)=>{
    res.sendFile(pubFolder+"/index.html")
})
app.get("/book",(req,res)=>{
    res.sendFile(pubFolder+"/book_appoint.html")
})
app.get("/view",(req,res)=>{
    res.sendFile(pubFolder+"/view_appoints.html")
})

app.post("/api",(req,res)=>{
    res.end();
    console.log(req.body);
})












app.listen(6000);