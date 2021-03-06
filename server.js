const express = require('express');
const cors = require("cors");
const data = require("./data.json");

const app = express();
app.use(cors());

const path = require('path');
const port = process.env.PORT || 3000;

app.get('/data', (req, res) => {
    res.json(data);
})

app.use(express.static('build'));
app.get('*', (req, res) => {
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})