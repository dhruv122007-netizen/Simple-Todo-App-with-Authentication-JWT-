const express = require("express");
const path = require("path");
const app = express();
const jwt = require("jsonwebtoken")
const authMiddleware = require("./authMiddleware")

app.use(express.json());

const notes = [];
const users = [];

app.post("/signup", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);
    if(userExists) {
        return res.status(403).json({
            Msg: "User Already Exists with this username"
        })
    }

    users.push(
        {
            username: username,
            password: password
        }
    )

    res.json({
        Msg: "You have signed up!"
    })
})

app.post("/signin", function(req, res) {

    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password)

    if(!userExists) {
        res.status(403).json({
            Msg: "Incorrect Credentials"
        })
        return;
    }

    const token = jwt.sign({
        username: username}, 
        "Dhruv1207"
    )
    res.json({
        token: token
    })
})


app.post("/notes",authMiddleware, function(req, res) {

    const username = req.username;
    const note = req.body.note;
    notes.push({note, username});

    res.json({
        Msg: "Your notes are pushed"
    })
})

app.get("/notes", authMiddleware, function (req, res) {

    const username = req.username;
    const userNotes = notes.filter(note => note.username === username)

    res.json({
        notes: userNotes
    })
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "/signup.html"));
})

app.get("/signin", function(req, res) {
    res.sendFile(path.join(__dirname, "/signin.html"));
})

app.listen(3000);