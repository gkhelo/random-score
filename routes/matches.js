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
        res.send(JSON.stringify(utils.groupByLeague(matches)));
    });
});

router.get('/live', (req, res) => {
    matchController.getLiveMatches(matches => {
        res.send(JSON.stringify(matches));
    });
});

module.exports = router;