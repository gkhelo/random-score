var Team = require('../models/team');

exports.init = function() {
    Team.findOne({ name: 'init' })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing Team schema');
            }
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