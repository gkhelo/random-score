var leagueController = require('../controllers/leagueController');
var matchController = require('../controllers/matchController');
var teamController = require('../controllers/teamController');
var resultController = require('../controllers/resultController');

exports.initSchemas = function() {
    leagueController.init();
    matchController.init();
    teamController.init();
    resultController.init();
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

exports.getResult = function(myScore, otherScore) {
    if (myScore > otherScore) {
        return 'W';
    } else if (myScore < otherScore) {
        return 'L';
    } else {
        return 'D';
    }
}

exports.getPoints = function(result) {
    if (result == 'W') {
        return 3;
    } else if (result == 'D') {
        return 1;
    } else {
        return 0;
    }
}