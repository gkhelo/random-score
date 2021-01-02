var leagueController = require('../controllers/leagueController');
var matchController = require('../controllers/matchController');
var teamController = require('../controllers/teamController');

exports.initSchemas = function() {
    leagueController.init();
    matchController.init();
    teamController.init();
}

exports.getTime = function(hour, minute) {
    if (minute < 10) {
        return hour + ':0' + minute;
    } else {
        return hour + ':' + minute;
    }
}

exports.sortStandings = function(standings, league) {
    standings.sort((t1, t2) => t2.points - t1.points);
        
    let i = 0;
    standings.forEach(team => {
        i++;

        if (i <= league.promotions) {
            team.status = 2;
        } else if (i <= standings.length - league.relegations) {
            team.status = 1;
        }
    })
}

exports.groupByLeague = function(matches) {
    let leagueMatches = new Map();

    matches.forEach(match => {
        if (!leagueMatches.has(match.league)) {
            leagueMatches.set(match.league, [match])
        } else {
            leagueMatches.get(match.league).push(match);
        }
    })

    let result = [];
    for (const [league, matches] of leagueMatches.entries()) {
        result.push({
            id: league._id,
            name: league.name,
            matches: matches.sort((m1, m2) => {
                let start1 = parseInt(m1.time.substring(0, 2));
                let start2 = parseInt(m2.time.substring(0, 2));

                return start1 - start2;
            })
        });
    }

    return result;
}