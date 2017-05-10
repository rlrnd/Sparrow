/*jshint node:true*/
module.exports = function (app) {
  const express = require('express');
  const compiledFormsRouter = express.Router();
  const fs = require('fs');

  compiledFormsRouter.get('/:name', function (req, res) {
    let cf = fs.readFileSync('server/mocks/mock-compiled-form.json', 'utf8');
    cf = cf.replace("@formName@", req.params.name);
    res.status(200).set("Content-Type", "application/javascript").send(cf);
  });

  app.use('/api/compiledForms', compiledFormsRouter);
};
