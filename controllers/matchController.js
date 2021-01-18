var Match = require('../models/match');
var simulator = require('../services/simulator');
var notificationController = require('./notificationController');

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

    query.populate('league', ['_id', 'name', 'promotions', 'relegations'])
        .populate('homeTeam', ['_id', 'name', 'logo', 'code'])
        .populate('guestTeam', ['_id', 'name', 'logo', 'code']);

    return query.exec();
}

exports.getByDay = function(day) {
    let query = Match.find({ day: day });

    query.populate('league', 'name')
        .populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo']);
        
    return query.exec()
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

exports.getByDayAndStatuses = function(day, statuses) {
    let query = Match.find(
        { 
            day: day,
            status: {
                $in: statuses
            },
        });

    query.populate('league', 'name')
        .populate('homeTeam', ['_id', 'name', 'logo'])
        .populate('guestTeam', ['_id', 'name', 'logo']);
        
    return query.exec();
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

    query.sort({ day: 'asc'})
    
    query.exec(function(err, matches) {
        if (err) {
            console.log('Error occurred during fetching matches data from db', err);
            callback([]);
        }

        callback(matches);
    });
}

exports.getLiveMatches = function() {
    let query = Match.find(
        { 
            status: {
                $in: ['INPLAY', 'FINISHED']
            },
            day: simulator.getDay()
        });

    return query.exec();
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

    query.populate('homeTeam', ['_id', 'name', 'logo', 'code'])
        .populate('guestTeam', ['_id', 'name', 'logo', 'code'])

    return query.exec();
}

exports.startMatches = function(day, time) {
    Match.find(
        { 
            day: day, 
            time: time,
            status: 'NOT_STARTED'
        }
    )
    .populate('homeTeam')
    .populate('guestTeam')
    .exec((err, matches) => {
        if (err) {
            console.log('Error occurred during fetching scheduled matches data from db', err);
        } else {
            matches.forEach(match => {
                match.status = 'INPLAY';
                match.minute = 0;
                match.homeScore = 0;
                match.guestScore = 0;

                if (match.homeTeam.favourite) {
                    notificationController.create(match.homeTeam, match);
                }
                if (match.guestTeam.favourite) {
                    notificationController.create(match.guestTeam, match);
                }

                match.save();
            });
        }
    });
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