var Notification = require('../models/notification');

exports.init = function() {
    Notification.findOne({ seen: true })
        .exec((err, res) => {
            if (err) {
                console.log('Error occurred during initializing Notification schema');
            }
        });
}

exports.create = function(team, match) {
    let notification = new Notification({
        team: team,
        match: match,
        time: new Date(),
        seen: false
    });

    notification.save(err => {
        if (err) {
            console.log('Error occurred during notification creation', err);
        }
    });
}

exports.get = function(matches) {
    let query = Notification.find(
        { 
            seen: false,
            match: {
                $in: matches
            }
        });

    query.populate('team');

    return query.exec();
}

exports.count = function(matches) {
    let query = Notification.where(
        { 
            seen: false,
            match: {
                $in: matches
            }
        });

    return query.countDocuments();
}

exports.seen = function(id) {
    Notification.findById(id, (err, res) => {
        if (err) {
            console.log('Error occurred during notification update:', err);
        } else {
            res.seen = true;
            res.save();
        }
    });
}