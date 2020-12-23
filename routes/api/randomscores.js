const express = require('express');
const generator = require('../../services/generator');

const router = express.Router();

router.get('/league_matches', (req, res) => {
    res.send(JSON.stringify(generator.generate()));
});

module.exports = router;