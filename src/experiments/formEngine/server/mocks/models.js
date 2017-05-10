/*jshint node:true*/
module.exports = function(app) {
  const express = require('express');
  const modelsRouter = express.Router();
  const fs = require('fs');

  modelsRouter.get('/', function(req, res) {
    let fakeModels = fs.readFileSync('server/mocks/mock-models.json');
    res.status(200).set("Content-Type", "application/javascript").send(fakeModels);
  });

  app.use('/api/models', modelsRouter);
};
