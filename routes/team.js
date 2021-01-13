var express = require('express');

var teamController = require('../controllers/teamController');
var matchController = require('../controllers/matchController');
var resultController = require('../controllers/resultController');

var utils = require('../services/utils');

var router = express.Router();

router.get('/:id', (req, res) => {
    teamController.getById(req.params.id, (team) => {
        if (team == null) {
            res.send(JSON.stringify({
                status: 'error'
            }));
        } else {
            matchController.getByTeamId(req.params.id, (matches) => {
                console.log(team);
                resultController.get(team.league._id, standings => {
                    res.send(JSON.stringify({
                        status: 'ok',
        
                        team: team,
                        matches: matches,
                        standings: {
                            id: team.league._id,
                            name: team.league.name,
                            promotions: team.league.promotions,
                            relegations: team.league.relegations,
                            standings: utils.sortStandings(standings)
                        }
                    }));
                });
            });
        }
    });
})

module.exports = router;