const express = require("express");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pubFolder = path.join(__dirname,"/public");

const db = mysql.createConnection({
    host: "localhost",
    user: "user",
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
app.get("/book",(req,res)=>{
  res.sendFile(pubFolder+"/book_appoint.html")
})

app.post('/book', (req, res) => {
    // console.log(req.body);
    const { name, phNumber, email, date, time, doctor, remark } = req.body;
    const sql = `INSERT INTO userdata (name, phNumber, email, date, time, doctor, remark) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [name, phNumber, email, date, time, doctor, remark], (err, result) => {
      if (err) {
        throw err;
      }
      res.status(201).render("success", { result });
    });
  });

app.get('/mybooking', (req, res) => {
    // console.log(req.query.phNumber);
    const number = req.query.phNumber;
    // console.log(number);
    const sql = `SELECT * FROM userdata WHERE phNumber = ${db.escape(number)}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length === 0) {
            // If no results are found, sending the nodata.html file
            res.sendFile(pubFolder+"/nodata.html");
        } else {
            // If results are found, render the "mybooking" template with the result data
            res.render("mybooking", { result });
            // console.log(result);
        }
    });
});

app.get('/viewall', (req, res) => {
    const sql = 'SELECT * FROM userdata';
    db.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
        res.render("allbooking", { results });
    });
});
//..........................................................Thats the extra code................................
app.get('/reschedule', (req, res) => {
    const { phNumber, newDate } = req.query;
  
    if (!phNumber || !newDate) {
      return res.status(400).send('Both phone number and new date are required.');
    }
  
    const updateSql = `UPDATE userdata SET date = ? WHERE phNumber = ?`;
    db.query(updateSql, [newDate, phNumber], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error updating date in the database.');
      }
      if (result.affectedRows === 0) {
        return res.status(404).send('User not found or no changes made.');
      }
      res.status(200).send('Date rescheduled successfully.');
    });
  });
//...................................................................................................................
app.get("/main",(req,res)=>{
    res.sendFile(pubFolder+"/index.html");
})

app.get("*",(req,res)=>{
    res.sendFile(pubFolder+"/error.html");
})


app.listen(5000);
