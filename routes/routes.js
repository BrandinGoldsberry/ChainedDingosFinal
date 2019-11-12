var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/data');

var mdb = mongoose.connection;
mdb.on('error', console.error.bind(console, 'connection error:'));
mdb.once('open', function (callback) {

});

var personSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  age: String,
  q1: String,
  q2: String,
  q3: String
});

var Person = mongoose.model('People_Collection', personSchema);