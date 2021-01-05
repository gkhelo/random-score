var Result = require('../models/result');

var utils = require('../services/utils');

exports.init = function() {
    Result.findOne({ points: 0 })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing Result schema');
            }
        });
}

exports.update = function(team, league, result, diff) {
    Result.findOneAndUpdate(
        {
            team: team._id,
            league: league._id,
        },
        {
            $inc: {
                'win': result == 'W',
                'lost': result == 'L',
                'draw': result == 'D',

                'matches': 1, 
                'diff': diff,
                'points': utils.getPoints(result),
            }
        }
    ).exec((err, res) => {
        if (err) {
            console.log('Error occurred during saving team result');
        }
    });
}

exports.get = function(league, callback) {
    Result.find({ league: league._id })
        .populate('team', ['_id', 'name', 'logo'])
        .exec(function(err, results) {
            if (err) {
                console.log('Error occurred during fetching results data from db', err);
                callback([]);
                return;       
            }

            callback(results);
        });
}

// for testing
exports.startup = function() {
    Result.updateMany(
        {},
        { 
            $set: { 
                matches: 0,
                win: 0,
                draw: 0,
                lost: 0,
                diff: 0,
                points: 0
            } 
        }
    ).exec();
}