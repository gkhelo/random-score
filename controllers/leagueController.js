var League = require('../models/league');

exports.init = function() {
    League.findOne({ name: 'init' })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing League schema');
            }
        });
}

exports.getAll = function(callback) {
    League.find({}).exec(function(err, leagues) {
        if (err) {
            console.log('Error occurred during fetching leagues data from db', err);
            callback([]);
        }

        callback(leagues);
    });
};