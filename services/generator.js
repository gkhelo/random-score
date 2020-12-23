const teams = require('./teams')
const leagues = require('./leagues');
const utils = require('./utils');

const generator = {
    generate: function() {
        let allLeagues = leagues.getAll();

        let result = [];
        allLeagues.forEach(league => {
            let leagueTeams = teams.getByLeagueId(league.id);
            let numMatches = utils.randomNumber(0, leagueTeams.length / 2)

            let matches = [];
            let teamIndices = utils.randomUniqueNumbers(0, leagueTeams.length - 1, 2 * numMatches);
            for (let i = 0; i < numMatches; i += 2) {
                let home = leagueTeams[teamIndices[i]];
                let guest = leagueTeams[teamIndices[i + 1]];

                let status = utils.randomStatus();
                let startTime = utils.time();

                let currentTime = 0;
                let homeScore = 0;
                let guestScore = 0;

                if (status != -1) {
                    currentTime = utils.randomNumber(0, 95);
                    homeScore = utils.randomNumber(0, 5);
                    guestScore = utils.randomNumber(0, 5);
                }

                matches.push({
                    homeId: home.id,
                    homeName: home.name,
                    homeLogo: home.logo,
                    homeScore: homeScore,

                    guestId: guest.id,
                    guestName: guest.name,
                    guestLogo: guest.logo,
                    guestScore: guestScore,

                    status: status,
                    startTime: startTime,
                    currentTime: currentTime
                });
            }

            if (matches.length != 0) {
                result.push({
                    id: league.id,
                    name: league.name,
                    matches: matches
                });
            }
        });

        return result;
    }
};

module.exports = generator;