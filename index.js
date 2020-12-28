var express = require('express');
var path = require('path');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', require('./routes/randomscores'));
app.use('/api/matches', require('./routes/matches'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));