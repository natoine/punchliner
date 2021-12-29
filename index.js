"use strict";

const { response } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dbservice = require('./services/DataBaseService');

app.use(express.json());//needed to parse request body in json

app.use(express.static('resources/public'));

app.get("/punchline", function (request, response) {
  var punchline = { "lyrics": "qui peut prétendre faire du rap sans prendre position", "song": "menace de mort", "punchliner": "youssoupha" };
  response.send(punchline);
});


app.get('/punchlines', function (request, response) {
  dbservice.getPunchlines(function (error, data) {
    if (error) {
      response.writeHead(error.code, {
        'Content-Length': Buffer.byteLength(error.message),
        'Content-Type': 'text/plain'
      }).end(error.message);
    }
    else {
      response.send(data);
    }
  });
});

app.post('/newpunchline', function (request, response) {
  const newpunchline = request.body;
  dbservice.createPunchline(newpunchline, function (error, newPunchlineId) {
    if (error) {
      response.writeHead(error.code, {
        'Content-Length': Buffer.byteLength(error.message),
        'Content-Type': 'text/plain'
      }).end(error.message);
    }
    else {
      let resbody = "punchline created with id : " + newPunchlineId.toHexString();
      response.writeHead(201, {
        'Content-Length': Buffer.byteLength(resbody),
        'Content-Type': 'text/plain'
      }).end(resbody);
    }
  });
});

app.listen(PORT, function () {
  console.log('Punchliner lancé sur le port :' + PORT);
});