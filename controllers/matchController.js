var Match = require('../models/match');

exports.getByDay = function(day, callback) {
    Match.find({day: day})
        .populate('league', 'name')
        .populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo'])
        .exec(function(err, matches) {
            if (err) {
                console.log('Error occurred during fetching matches data from db', err);
                callback([]);
            }

            callback(matches);
        });
};

exports.getByDayAndStatus = function(day, status, callback) {
    Match.find({day: day, status: status}).exec(function(err, matches) {
        if (err) {
            console.log('Error occurred during fetching matches data from db', err);
            callback([]);
        }

        callback(matches);
    });
};