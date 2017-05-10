/* eslint-env node */
module.exports = function (app) {
  const express = require('express');
  const filesRouter = express.Router();
  const fs = require('fs');

  filesRouter.get('/:id', function (req, res) {
    let fakeFile = JSON.parse(fs.readFileSync('server/mocks/mock-file.json'));
    fakeFile.id = req.params.id;
    res.send(fakeFile);
  });

  app.use('/api/files', filesRouter);
};
