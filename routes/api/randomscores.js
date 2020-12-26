const express = require('express');
const generator = require('../../services/generator');

const router = express.Router();

router.get('/league_matches', (req, res) => {
    res.send(JSON.stringify(generator.matches()));
});

router.get('/league_standings', (req, res) => {
    res.send(JSON.stringify(generator.standings()));
})

module.exports = router;