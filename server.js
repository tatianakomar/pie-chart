const express = require('express');
const app = express();

const data = require("./data.json");

const path = require('path');
const port = process.env.PORT || 3005;

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