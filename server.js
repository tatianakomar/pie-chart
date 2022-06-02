const express = require('express');
const cors = require("cors");
const data = require("./data.json");

const app = express();
app.use(cors());

const path = require('path');
const port = process.env.PORT || 3005;

app.get('/data', (req, res) => {
    console.log("I am in /data");
    res.json(data);
})

app.use(express.static('build'));
app.get('*', (req, res) => {
    console.log('I am static')
    req.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})