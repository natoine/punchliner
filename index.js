"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('resources/public'));

  app.listen(PORT, function () {
    console.log('Punchliner lancé sur le port :' + PORT);
  });