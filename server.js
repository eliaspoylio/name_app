const express = require('express');

const server = express();
const path = require('path');
var cors = require('cors')

server.use(express.json());
server.use(cors())

const names = require('./src/data/names.json')

//API requests
server.get('/api/all', (req, res) => {
    console.log("/api/all");
    res.sendFile(path.join(__dirname, '/src/data', 'names.json'));
});

//Return the amount of the name given as a parameter
server.get('/api/:name', (req, res) => {
    console.log("/api/"+req.params.name);
    var nameTofind = Object.values(names)[0].filter(obj => obj.name === req.params.name);
    res.json({ name: req.params.name, amount: nameTofind[0].amount });
});

//default
server.get('*', (req, res) => {
    res.send('Hello');
});

const port = process.env.PORT || 2020; server.listen(port, () => {
    console.log('Listening on port', port);
});