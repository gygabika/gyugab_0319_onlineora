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