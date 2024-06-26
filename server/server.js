const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const con = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "Infs"
});

// con.connect((err) => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required!" });
    }

    con.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, result) => {
        if (err) {
            return res.status(500).send({ error: err.message });
        } 
        
        if (result.length > 0) {
            res.send(result);
        } else {
            res.status(401).send({ message: "WRONG USERNAME OR PASSWORD!" });
        }
    });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
