var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NotificationSchema = new Schema({
    team: {type: Schema.ObjectId, ref: 'Team', required: true},
    match: {type: Schema.ObjectId, ref: 'Match', required: true},
    
    time: {type: Date, required: true},
    seen: {type: Boolean, default: false, required: true},
});

module.exports = mongoose.model('Notification', NotificationSchema);