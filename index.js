var express = require('express');
var path = require('path');
require('dotenv').config();

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.DB;
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
app.use('/api/time', require('./routes/time'));
app.use('/api/team', require('./routes/team'));
app.use('/api/matches', require('./routes/matches'));
app.use('/api/standings', require('./routes/standings'));
app.use('/api/notifications', require('./routes/notification'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));