var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: {type: String, required: true},
    code: {type: String, required: false},
    logo: {type: String, required: true},
    league: {type: Schema.ObjectId, ref: 'League', required: true},

    favourite: {type: Boolean, required: false, default: false}
});

module.exports = mongoose.model('Team', TeamSchema);