var express = require('express');

var teamController = require('../controllers/teamController');
var matchController = require('../controllers/matchController');
var resultController = require('../controllers/resultController');

var utils = require('../services/utils');
const team = require('../models/team');

var router = express.Router();

router.get('/:id', (req, res) => {
    teamController.getById(req.params.id, (team) => {
        if (team == null) {
            res.send(JSON.stringify({
                status: 'error'
            }));
        } else {
            matchController.getByTeamId(req.params.id, (matches) => {
                resultController.get(team.league._id).then(standings => {
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
});

router.get('/name/:name', (req, res) => {
    teamController.getByName(req.params.name, (team) => {
        if (team == null) {
            res.send(JSON.stringify({
                status: 'error'
            }));
        } else {
            matchController.getByTeamId(team._id, (matches) => {
                resultController.get(team.league._id).then(standings => {
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
});

router.post('/favourite/:id', (req, res) => {
    teamController.updateFavourite(req.params.id);
})

module.exports = router;