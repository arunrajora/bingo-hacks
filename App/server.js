//server.js
'use strict'

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Bingo = require('./model/model');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Acc' +
      'ess-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

router.get('/', function (req, res) {
  res.json({message: 'API Initialized!'});
});

app.use('/api', router);

app.listen(port, function () {
  console.log(`api running on port ${port}`);
});

//db config
mongoose.connect('mongodb://vigzmv:vigzmv@ds141950.mlab.com:41950/vigzm');

router.route('/bingo')
  .get(function (req, res) {
  Bingo.find(function (err, bingos) {
    if (err)
      res.send(err);
    res.json(bingos)
  });
})
  .post(function (req, res) {
  var bingos = new Bingo();
  bingos.party1 = req.body.party1;
  bingos.party2 = req.body.party2;
  bingos.transId = req.body.transId;
  bingos.transData = req.body.transData;

  bingos.save(function (err) {
    if (err)
      res.send(err);
    res.json({message: 'Bingo successfully added!'});
  });
});
