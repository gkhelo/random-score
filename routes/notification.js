var express = require('express');

var matchController = require('../controllers/matchController');
var notificationController = require('../controllers/notificationController');

var router = express.Router();

router.get('/', (req, res) => {
    matchController.getByStatus('INPLAY')
    .then(notificationController.get)
    .then(notifications => res.send(JSON.stringify(notifications)));
})

router.get('/count', (req, res) => {
    matchController.getByStatus('INPLAY')
    .then(notificationController.count)
    .then(count => res.send(JSON.stringify(count)));
})

router.post('/seen/:id', (req, res) => {
    notificationController.seen(req.params.id);
})

module.exports = router;