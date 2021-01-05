var express = require('express');
var path = require('path');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Initialize db schemas
var utils = require('./services/utils');
utils.initSchemas();

// Start simulation
var simulator = require('./services/simulator');
simulator.start();

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/matches', require('./routes/matches'));
app.use('/api/standings', require('./routes/standings'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));