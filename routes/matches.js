var express = require('express');
var matchController = require('../controllers/matchController');

var router = express.Router();

function groupByLeague(matches) {
    let leagueMatches = new Map();

    matches.forEach(match => {
        if (!leagueMatches.has(match.league)) {
            leagueMatches.set(match.league, [match])
        } else {
            leagueMatches.get(match.league).push(match);
        }
    })

    let result = [];
    for (const [league, matches] of leagueMatches.entries()) {
        result.push({
            id: league._id,
            name: league.name,
            matches: matches
        })
    }

    return result;
}

router.get('/:day', (req, res) => {
    matchController.getByDay(req.params.day, matches => {
        res.send(JSON.stringify(groupByLeague(matches)));
    })
});

router.get('/:day/:status', (req, res) => {
    matchController.getByDayAndStatus(req.params.day, req.params.status, matches => {
        res.send(JSON.stringify(matches));
    })
});

module.exports = router;