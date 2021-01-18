var Team = require('../models/team');

exports.init = function() {
    Team.findOne({ name: 'init' })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing Team schema');
            }
        });
}

exports.getById = function(id, callback) {
    Team.findOne({ _id: id })
        .populate('league', ['_id', 'name', 'promotions', 'relegations'])
        .exec((err, team) => {
        if (err) {
            console.log('Error occurred during fetching teams data from db', err);
            callback(null);
        }

        callback(team);
    });
}

exports.getByLeagueId = function(leagueId, callback) {
    Team.find({ league: leagueId }).exec((err, teams) => {
        if (err) {
            console.log('Error occurred during fetching teams data from db', err);
            callback([]);
        }

        callback(teams);
    });
}

exports.updateFavourite = function(id) {
    Team.findById(id, (err, res) => {
        if (err) {
            console.log('Error occurred during updating favourite:', err);
        } else {
            res.favourite = !res.favourite;
            res.save();
        }
    });
}