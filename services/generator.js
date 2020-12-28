var leagueController = require('../controllers/leagueController');
var teamController = require('../controllers/teamController');
var utils = require('./utils');

exports.matches = function(callback) {
    let leaguesPromise = new Promise((resolve, reject) => {
        leagueController.getAll(resolve);
    });

    leaguesPromise.then(leagues => {
        let promises = [];
        leagues.forEach(league => {
            let promise = new Promise((resolve, reject) => {
                teamController.getByLeagueId(league._id, teams => {
                    resolve(utils.randomMatches(league, teams));
                });
            });
            promises.push(promise);
        })

        Promise.all(promises)
            .then(allMatches => {
                let result = [];
                allMatches.forEach(info => {
                    if (info.matches.length != 0) {
                        result.push({
                            id: info.leagueId,
                            name: info.leagueName,
                            matches: info.matches
                        });
                    }
                })

                callback(result);
            });
    });
}

// const generator = {
//     matches() {
//         let allLeagues = leagues.getAll();

//         let result = [];
//         allLeagues.forEach(league => {
//             let leagueTeams = teams.getByLeagueId(league.id);
//             let numMatches = utils.randomNumber(0, leagueTeams.length / 2)

//             let matches = [];
//             let teamIndices = utils.randomUniqueNumbers(0, leagueTeams.length - 1, 2 * numMatches);
//             for (let i = 0; i < numMatches; i += 2) {
//                 let home = leagueTeams[teamIndices[i]];
//                 let guest = leagueTeams[teamIndices[i + 1]];

//                 let status = utils.randomStatus();
//                 let startTime = utils.time();

//                 let currentTime = 0;
//                 let homeScore = 0;
//                 let guestScore = 0;

//                 if (status != -1) {
//                     currentTime = utils.randomNumber(0, 95);
//                     homeScore = utils.randomNumber(0, 5);
//                     guestScore = utils.randomNumber(0, 5);
//                 }

//                 matches.push({
//                     homeId: home.id,
//                     homeName: home.name,
//                     homeLogo: home.logo,
//                     homeScore: homeScore,

//                     guestId: guest.id,
//                     guestName: guest.name,
//                     guestLogo: guest.logo,
//                     guestScore: guestScore,

//                     status: status,
//                     startTime: startTime,
//                     currentTime: currentTime
//                 });
//             }

//             if (matches.length != 0) {
//                 result.push({
//                     id: league.id,
//                     name: league.name,
//                     matches: matches
//                 });
//             }
//         });

//         return result;
//     },

//     standings() {
//         let allLeagues = leagues.getAll();

//         let result = [];
//         allLeagues.forEach(league => {
//             let leagueTeams = teams.getByLeagueId(league.id);

//             let standings = [];

//             let games = utils.randomNumber(5, 10);
//             leagueTeams.forEach(team => {
//                 let wonDrawLost = utils.wonDrawLost(games);
//                 let won = wonDrawLost[0];
//                 let draw = wonDrawLost[1];
//                 let lost = wonDrawLost[2];
                
//                 let diff = utils.goalsDiff(won, draw, lost);
//                 let pts = utils.points(won, draw, lost);

//                 standings.push({
//                     name: team.name,
//                     logo: team.logo,
//                     games: games,
//                     won: won,
//                     draw: draw,
//                     lost: lost,
//                     diff: diff,
//                     points: pts,
//                     status: 0
//                 });

//             });

//             utils.sortStandings(standings, league);

//             result.push({
//                 id: league.id,
//                 name: league.name,
//                 standings: standings
//             });

//         });

//         return result;
//     }
// };

// module.exports = generator;