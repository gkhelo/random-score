var express = require('express');
var async = require('async');

var leagueController = require('../controllers/leagueController');
var resultController = require('../controllers/resultController');

var utils = require('../services/utils');

var router = express.Router();

router.get('/', (req, res) => {
    leagueController.getAll(leagues => {
        let queries = [];
        leagues.forEach(league => {
            queries.push(function(cb) {
                resultController.get(league).then(standings => {
                    cb(null,
                    {
                        id: league._id,
                        name: league.name,
                        promotions: league.promotions,
                        relegations: league.relegations,
                        standings: utils.sortStandings(standings)
                    });
                });
            });
        });

        async.series(queries, (err, results) => {
            if (err) {
                console.log('Error occurred during getting league standings', err);
                res.send(JSON.stringify([]));
                return;
            }

            res.send(JSON.stringify(results));
        });
    });
});

module.exports = router;