/*
TODO:
error response
*/

const express = require('express');

const server = express();
const path = require('path');

//server.use(express.static(path.join(__dirname, 'build')));

server.use(express.json());

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
    console.log(nameTofind[0].amount);
    res.json({ name: req.params.name, hello: nameTofind[0].amount });
});



//default
server.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'build/index.html'));
    res.send('Hello');
});

const port = process.env.PORT || 2020; server.listen(port, () => {
    console.log('Listening on port', port);
});