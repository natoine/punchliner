"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send('Bienvenue sur punchliner - on bosse sur la home pour le moment !');
  });

  app.listen(PORT, function () {
    console.log('Punchliner lancé sur le port :' + PORT);
  });