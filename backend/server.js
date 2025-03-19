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
        if (err) {
            console.error("SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
        }
        return res.json(result);
    });
});

// 1. feladat
app.get('/versenyekszamok', (req, res) => {
    const sql = "SELECT versenyzoNev FROM versenyekszamok WHERE eredmeny > 60";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
        }
        return res.json(result);
    });
});

// 2. feladat
app.post('/uj_nemzet', (req, res) => {
    const {nemzet} = req.body;
    const sql = 'INSERT INTO nemzetek (Nemzet) VALUES (?)';
    connection.query(sql, [nemzet], (err, result) => {
      if (err) {
        console.error('Hiba a nemzet felvitelénél: ', err);
        return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
      }
      res.send(`Sikeresen felvettük a(z) ${nemzet} nemzetet!`);
      return res.json(result);
    });
});

