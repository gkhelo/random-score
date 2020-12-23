const fs = require('fs');
const path = require('path');

const leagues = {
    getAll: function() {
        let leaguesPath = path.join(__dirname, '../data/leagues.json')
        return JSON.parse(fs.readFileSync(leaguesPath));
    }

};

module.exports = leagues;