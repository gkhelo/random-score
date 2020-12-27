var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LeagueSchema = new Schema({
    name: {type: String, required: true},
    promotions: {type: Number, required: true},
    relegations: {type: Number, required: true},
});

module.exports = mongoose.model('League', LeagueSchema);