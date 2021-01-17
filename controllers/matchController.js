var Match = require('../models/match');
var simulator = require('../services/simulator');

exports.init = function() {
    Match.findOne({ status: 'init' })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing Match schema');
            }
        });
}

exports.getById = function(id) {
    let query = Match.findOne({ _id: id });

    query.populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo']);

    return query.exec();
}

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

exports.getByDayAndStatuses = function(day, statuses, populate, callback) {
    let query = Match.find(
        { 
            day: day,
            status: {
                $in: statuses
            },
        });

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

exports.getByTeamId = function(teamId, callback) {
    let query = Match.find(
        { 
            $or: [
                {
                    homeTeam: teamId
                },
                {
                    guestTeam: teamId
                }
            ]
        }
    );

    query.populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo'])
    
    query.exec(function(err, matches) {
        if (err) {
            console.log('Error occurred during fetching matches data from db', err);
            callback([]);
        }

        callback(matches);
    });
}

exports.getLiveMatches = function(callback) {
    let today = simulator.getDay();
    
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

exports.getTeamLastMatches = function(teamId, numMatches) {
    let query = Match.find(
        { 
            status: 'FINISHED',
            $or: [
                {
                    homeTeam: teamId
                },
                {
                    guestTeam: teamId
                }
            ]
        })
        .sort({ day: 'desc' })
        .limit(numMatches);

    query.populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo'])

    return query.exec();
}

exports.startMatches = function(day, time) {
    Match.updateMany(
        { 
            day: day, 
            time: time,
            status: 'NOT_STARTED'
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