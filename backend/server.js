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
 
app.get("/", (req,res) => {
    res.send("Fut a backend!");
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
app.get("/versenyekszamok", (req, res) => {
    const sql = "SELECT DISTINCT Versenyszam FROM versenyekszamok WHERE Versenyszam IN ('20 km gyaloglás', '50 km gyaloglás', 'maraton');";
    db.query(sql, (err, result) => {
        if (err) {
            console.error("SQL Hiba:", err);
            return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
        }
        return res.json(result);
    });
});

// 2. feladat
app.post("/uj_nemzet", (req, res) => {
    const {nemzet} = req.body;
    const sql = "INSERT INTO nemzetek (Nemzet) VALUES (?)";
    db.query(sql, [nemzet], (err, result) => {
      if (err) {
        console.error("Hiba a nemzet felvitelénél: ", err);
        return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
      }
      res.send(`Sikeresen felvettük a(z) ${nemzet} nemzetet!`);
    });
});

// 3. feladat
app.delete("/nemzet_torles", (req, res) => {
    const {nemzet} = req.body;
    const sql = "DELETE FROM nemzetek WHERE Nemzet = ?;";
    db.query(sql, [nemzet], (err, result) => {
      if (err) {
        console.error("Hiba a nemzet törlésénél: ", err);
        return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
      }
      res.send(`Sikeresen töröltük a(z) ${nemzet} nemzetet!`);
    });
});

// 4. feladat
app.put("/eredmeny_modositas", (req, res) => {
    const {nemzet, versenyzoNev, ujEredmeny} = req.body;
    const sql = "UPDATE versenyekszamok SET Eredmeny = ? WHERE NemzetKod = (SELECT NemzetId FROM nemzetek WHERE Nemzet = ?) AND VersenyzoNev = ?;";
    db.query(sql, [ujEredmeny, nemzet, versenyzoNev], (err, result) => {
      if (err) {
        console.error("Hiba az eredmény módosításánál: ", err);
        return res.status(500).json({ error: "Adatbázis lekérdezési hiba!" });
      }
      res.send(`Sikeresen módosítottuk ${versenyzoNev} eredményét a(z) ${nemzet} nemzetnél!`);
    });
});