const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

const notes = [];

app.post("/notes", function(req, res) {
    const note = req.body.note;
    notes.push(note);

    res.json({
        msg: "Your notes are pushed"
    })
})

app.get("/notes", function (req, res) {
    res.json({
        notes
    })
})

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
})

app.listen(3000);