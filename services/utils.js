exports.randomMatches = function(league, teams) {
    let numMatches = this.randomNumber(0, teams.length / 2)

    let matches = [];
    let teamIndices = this.randomUniqueNumbers(0, teams.length - 1, 2 * numMatches);
    for (let i = 0; i < numMatches; i += 2) {
        let home = teams[teamIndices[i]];
        let guest = teams[teamIndices[i + 1]];

        let status = this.randomStatus();
        let startTime = this.time();

        let currentTime = 0;
        let homeScore = 0;
        let guestScore = 0;

        if (status != -1) {
            currentTime = this.randomNumber(0, 95);
            homeScore = this.randomNumber(0, 5);
            guestScore = this.randomNumber(0, 5);
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

    return { 
        leagueId: league._id, 
        leagueName: league.name,
        matches: matches 
    };
}

exports.randomNumber = function(from, to) {
    return from + Math.floor(Math.random() * (to - from + 1));
}

exports.randomUniqueNumbers = function(from, to, size) {
    let result = [];
    let numTries = 0;

    while(result.length < size) {
        if (numTries > 3 * size) {
            break;
        }

        numTries++;

        let num = this.randomNumber(from, to);
        if (result.indexOf(num) == -1) {
            result.push(num);
        }
    }

    let i = from;
    while (result.length < size) {
        result.push(i);
        i++;
    }

    return result;
}

exports.randomPair = function(from, to, used) {
    let a, b;

    while (true) {
        let num = this.randomNumber(from, to);
        if (used.indexOf(num) == -1) {
            a = num;
            break;
        }
    }

    while (true) {
        let num = this.randomNumber(from, to);
        if (a != num && used.indexOf(num) == -1) {
            b = num;
            break;
        }
    }

    return [a, b];
}

exports.randomStatus = function() {
    let rand = this.randomNumber(0, 2);
    return -1 + rand;
}

exports.randomTime = function() {
    let time = this.randomNumber(15, 21);
    return time.toString().concat(':00');
}

exports.wonDrawLost = function(games) {
    let won = utils.randomNumber(0, games);
    games -= won;
    let draw = utils.randomNumber(0, games);
    games -= draw;
    let lost = games;

    return [won, draw, lost];
}

exports.goalsDiff = function(won, draw, lost) {
    return 2 * won - lost;
}

exports.points = function(won, draw, lost) {
    return 3 * won + draw;
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

exports.randomSchedule = function(teams) {
    let numDays = 60;

    let teamUsedDays = new Map();
    for (let i = 0; i < teams.length; i++) {
        teamUsedDays[i] = [];
    }

    let matches = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < teams.length && i != j; j++) {
            let days = this.randomPair(1, numDays, teamUsedDays[i].concat(teamUsedDays[j]));

            matches.push({
                home: teams[i],
                guest: teams[j],
                day: days[0],
                time: this.randomTime()
            });

            matches.push({
                home: teams[j],
                guest: teams[i],
                day: days[1],
                time: this.randomTime()
            });

            teamUsedDays[i].push(days[0]);
            teamUsedDays[i].push(days[1]);

            teamUsedDays[j].push(days[0]);
            teamUsedDays[j].push(days[1]);
        }
    }

    return matches;
}