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
            matches: matches.sort((m1, m2) => {
                let start1 = parseInt(m1.time.substring(0, 2));
                let start2 = parseInt(m2.time.substring(0, 2));

                return start1 - start2;
            })
        });
    }

    return result;
}

router.get('/filter/:day', (req, res) => {
    matchController.getByDay(req.params.day, true, matches => {
        res.send(JSON.stringify(groupByLeague(matches)));
    });
});

router.get('/live', (req, res) => {
    matchController.getLiveMatches(matches => {
        res.send(JSON.stringify(matches));
    });
});

module.exports = router;