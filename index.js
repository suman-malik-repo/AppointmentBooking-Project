const express = require("express");
const app = express();
const path = require("path");
const mysql = require("mysql");
// const connection = require("./connection");
// const mysql = require("mysql");

// const bodyParser = require("body-parser");
// app.use(bodyParser.json)

app.use(express.urlencoded()); // midleware

const pubFolder = path.join(__dirname,"/public");

const db = mysql.createConnection({
    host: "database-aws.cz3ndii0zph3.us-west-2.rds.amazonaws.com",
    user: "adminaws",
    database: "database-aws",
    password: "12345678",
    port: "3306"
});
db.connect((err)=>{
    if(!err){
        console.log("Success");
    }
    else{
        console.log(err);
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

app.get("*",(req,res)=>{
    res.send("404 ERROR")
})








app.listen(6000);