"use strict";

const { response } = require('express');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dbservice = require('./services/DataBaseService');

app.use(express.static('resources/public'));

app.get("/punchline", function(request, response){
  var punchline = { "lyrics": "qui peut prétendre faire du rap sans prendre position", "song": "menace de mort", "punchliner": "youssoupha" };
  response.send(punchline);
});

  app.listen(PORT, function () {
    console.log('Punchliner lancé sur le port :' + PORT);
  });