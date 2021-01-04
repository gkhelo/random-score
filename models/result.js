var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ResultSchema = new Schema({
    league: {type: Schema.ObjectId, ref: 'League', required: true},
    team: {type: Schema.ObjectId, ref: 'Team', required: true},

    matches: {type: Number, required: true, default: 0},
    win: {type: Number, required: true, default: 0},
    draw: {type: Number, required: true, default: 0},
    lost: {type: Number, required: true, default: 0},

    diff: {type: Number, required: true, default: 0},
    points: {type: Number, required: true, default: 0},
});

module.exports = mongoose.model('Result', ResultSchema);