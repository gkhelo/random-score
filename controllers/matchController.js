var Match = require('../models/match');
var simulator = require('../services/simulator');

exports.getByDay = function(day, populate, callback) {
    let query = Match.find({ day: day });

    if (populate) {
        query.populate('league', 'name')
            .populate('homeTeam', ['_id', 'name', 'logo'])
            .populate('guestTeam', ['_id', 'name', 'logo'])
    }
        
    query.exec(function(err, matches) {
        if (err) {
            console.log('Error occurred during fetching matches data from db', err);
            callback([]);
        }

        callback(matches);
    });
};

exports.getByStatus = function(status, callback) {
    let query = Match.find({ status: status });

    query.exec(function(err, matches) {
        if (err) {
            console.log('Error occurred during fetching matches data from db', err);
            callback([]);
        }

        callback(matches);
    });
};

exports.getLiveMatches = function(callback) {
    let today = simulator.day;
    
    Match.find(
        { 
            status: {
                $in: ['INPLAY', 'FINISHED']
            },
            day: today
        })
        .exec(function(err, matches) {
            if (err) {
                console.log('Error occurred during fetching live matches data from db', err);
                callback([]);
            }

            callback(matches);
        });
}

exports.startMatches = function(day, time) {
    Match.updateMany(
        { 
            day: day, 
            time: time 
        },
        { 
            $set: { 
                status: 'INPLAY', 
                minute: 0, 
                homeScore: 0, 
                guestScore: 0 
            } 
        }
    ).exec();
}

// for testing
exports.startup = function() {
    Match.updateMany(
        {},
        { 
            $set: { 
                status: 'NOT_STARTED' 
            } 
        }
    ).exec();
}