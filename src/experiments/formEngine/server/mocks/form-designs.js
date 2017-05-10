/*jshint node:true*/
module.exports = function (app) {
  const express = require('express');
  const formRouter = express.Router();
  const fs = require('fs');

  formRouter.get('/:name', function (req, res) {
    let fakeForm = JSON.parse(fs.readFileSync('server/mocks/mock-form-design.json'));
    fakeForm.name = req.params.name;
    res.status(200).send(fakeForm);
  });
  
  app.use('/api/formDesigns', formRouter);
};
