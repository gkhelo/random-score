var express = require('express');

var matchController = require('../controllers/matchController');
var notificationController = require('../controllers/notificationController');

var router = express.Router();

router.get('/', (req, res) => {
    matchController.getByStatus('INPLAY')
    .then(notificationController.get)
    .then(notifications => {
        res.send(JSON.stringify(notifications));
    })
});

module.exports = router;