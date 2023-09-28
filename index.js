const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const pubFolder = path.join(__dirname,"/public");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "HealthHepta",
    password: "12345678"
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

app.post('/book', (req, res) => {
    const { name, phNumber, email, date, time, doctor, remark } = req.body;
    const sql = `INSERT INTO UserData (name, phNumber, email, date, time, doctor, remark) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, phNumber, email, date, time, doctor, remark], (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).sendFile(pubFolder+"/success.html");
    });
  });

app.get('/mybooking', (req, res) => {
    const number = req.body.number;
    const sql = `SELECT * FROM UserData WHERE number = ${db.escape(number)}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.render("mybooking", { result });
    });
});

app.get('/viewall', (req, res) => {
    const sql = 'SELECT * FROM UaserData';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render("allbooking", { results });
    });
});

app.get("*",(req,res)=>{
    res.send("404 ERROR");
})


app.listen(process.argv.PORT || 5000);