'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bingoSchema = new Schema({
  buyer: String,
  seller: String,
  transId: String,
});

module.exports = mongoose.model('Bingo', bingoSchema);
