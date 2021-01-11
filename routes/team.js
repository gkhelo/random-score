var express = require('express');

var teamController = require('../controllers/teamController');
var matchController = require('../controllers/matchController');

var router = express.Router();

router.get('/:id', (req, res) => {
    teamController.getById(req.params.id, (team) => {
        if (team == null) {
            res.send(JSON.stringify({
                status: 'error'
            }));
        } else {
            matchController.getByTeamId(req.params.id, (matches) => {
                res.send(JSON.stringify({
                    status: 'ok',
    
                    team: team,
                    matches: matches
                }));
            })
        }
    });
})

module.exports = router;