var express = require('express');

var simulator = require('../services/simulator');

var router = express.Router();

router.get('/', (req, res) => {
    res.send(JSON.stringify({
        day: simulator.getDay(),
        hour: simulator.getHour(),
        minute: simulator.getMinute()
    }));
});

module.exports = router;