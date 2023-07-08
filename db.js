
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todo-list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection Error to MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = db;

