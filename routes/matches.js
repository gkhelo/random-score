var express = require('express');

var matchController = require('../controllers/matchController');

var utils = require('../services/utils');

var router = express.Router();

router.get('/filter/:day', (req, res) => {
    matchController.getByDay(req.params.day, true, matches => {
        res.send(JSON.stringify(utils.groupByLeague(matches)));
    });
});

router.get('/filter/:day/:statuses', (req, res) => {
    statuses = JSON.parse(req.params.statuses);
    
    matchController.getByDayAndStatuses(req.params.day, statuses, true, matches => {
        res.send(JSON.stringify(matches));
    });
});

router.get('/live', (req, res) => {
    matchController.getLiveMatches(matches => {
        res.send(JSON.stringify(matches));
    });
});

router.get('/preview/:id', (req, res) => {
    matchController.getById(req.params.id)
        .then(match => {
            let homePromise = matchController.getTeamLastMatches(match.homeTeam, 3);
            let guestPromise = matchController.getTeamLastMatches(match.guestTeam, 3);

            return Promise.all([match, homePromise, guestPromise]);
        })
        .then(info => {
            res.send(JSON.stringify({
                match: info[0],
                homeMatches: info[1],
                guestMatches: info[2]
            }));
        })
        .catch(err => {
            console.log('Error occurred while getting match preview details:', err);
        });
})

module.exports = router;