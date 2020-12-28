const express = require('express');
const generator = require('../services/generator');

const router = express.Router();

router.get('/league_matches', (req, res) => {
    generator.matches(matches => {
        res.send(JSON.stringify(matches));
    });
});

router.get('/league_standings', (req, res) => {
    res.send(JSON.stringify([]));
    // res.send(JSON.stringify(generator.standings()));
})

module.exports = router;