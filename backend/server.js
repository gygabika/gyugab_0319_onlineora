const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const nodemon = require("nodemon");
 
app.use(bodyParser.json());
app.use(cors());
 
const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3307,
    password: "",
    database: "atletikavb2017"
});
 
app.get("/", (req,rest) => {
    rest.send("Fut a backend!");
});

app.listen(2222, () => {
    console.log("A szerveren a 2222 porton fut!")
});

app.get("/",( req, res) => {
    const sql ="SELECT * FROM ``";
    db.query(sql, (err,result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});

// 1. feladat
app.get('/versenyekszamok', (req, res) => {
    const query = "SELECT versenyzoNev FROM versenyekszamok WHERE eredmeny > 60";
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json(result);
    });
});


