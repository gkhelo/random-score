const fs = require('fs');
const path = require('path');
const leagues = require('./leagues');

const teams = {
    getAll: function() {
        let teamsPath = path.join(__dirname, '../data/teams.json')
        return JSON.parse(fs.readFileSync(teamsPath));
    },

    getByLeagueId: function(leagueId) {
        let teamsPath = path.join(__dirname, '../data/teams.json')
        let allTeams = JSON.parse(fs.readFileSync(teamsPath));

        let result = [];
        allTeams.forEach(team => {
            if (team.league_id == leagueId) {
                result.push(team);
            }
        });

        return result;
    }

};

module.exports = teams;