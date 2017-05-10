/*jshint node:true*/
module.exports = function (app) {
  var express = require('express');
  var listRouter = express.Router();

  listRouter.get('/:name', function (req, res) {
    res.status(200).send({
      'list': {
        listName: req.params.name,
        items: [{
          id: 1,
          itemValue: "Type1",
          visibility: true
        }, {
          id: 2,
          itemValue: "Type2",
          visibility: false
        }, {
          id: 3,
          itemValue: "Type3",
          visibility: "expr_125"
        }],
        expressions: [{
          id: 'expr_125',
          content: '{0} != "Fax"',
          depends: 'file.equipments.equipmentType'
        }]
      }
    });
  });

  app.use('/api/lists', listRouter);
};
