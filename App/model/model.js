'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bingoSchema = new Schema({
  party1: String,
  party2: String,
  transId: String,
  transData: String,
});

module.exports = mongoose.model('Bingo', bingoSchema);
