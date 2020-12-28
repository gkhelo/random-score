var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MatchSchema = new Schema({
    league: {type: Schema.ObjectId, ref: 'League', required: true},

    homeTeam: {type: Schema.ObjectId, ref: 'Team', required: true},
    guestTeam: {type: Schema.ObjectId, ref: 'Team', required: true},

    homeScore: {type: Number, required: false},
    guestScore: {type: Number, required: false},
    
    status: {type: String, enum:['NOT_STARTED', 'INPLAY', 'FINISHED'], default:'NOT_STARTED', required: true},
    
    day: {type: Number, required: true},
    time: {type: String, required: true}, // start time 
    minute: {type: Number, required: false} // live minute, if match is in play
});

module.exports = mongoose.model('Match', MatchSchema);