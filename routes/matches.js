var express = require('express');

var matchController = require('../controllers/matchController');
var resultController = require('../controllers/resultController');

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
            let standingsPromise = resultController.get(match.league);

            return Promise.all([match, homePromise, guestPromise, standingsPromise]);
        })
        .then(info => {
            let match = info[0];
            res.send(JSON.stringify({
                status: 'ok',
                
                match: match,
                homeMatches: info[1],
                guestMatches: info[2],
                standings: {
                    id: match.league._id,
                    name: match.league.name,
                    promotions: match.league.promotions,
                    relegations: match.league.relegations,
                    standings: utils.sortStandings(info[3])
                }
            }));
        })
        .catch(err => {
            console.log('Error occurred while getting match preview details:', err);
            res.send(JSON.stringify({
                status: 'error'
            }));
        });
})

module.exports = router;