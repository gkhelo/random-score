var random = require('./random');

exports.schedule = function(teams) {
    let numDays = 60;

    let teamUsedDays = new Map();
    for (let i = 0; i < teams.length; i++) {
        teamUsedDays[i] = [];
    }

    let matches = [];
    for (let i = 0; i < teams.length; i++) {
        for (let j = 0; j < teams.length && i != j; j++) {
            let days = random.pair(1, numDays, teamUsedDays[i].concat(teamUsedDays[j]));

            matches.push({
                home: teams[i],
                guest: teams[j],
                day: days[0],
                time: random.time()
            });

            matches.push({
                home: teams[j],
                guest: teams[i],
                day: days[1],
                time: random.time()
            });

            teamUsedDays[i].push(days[0]);
            teamUsedDays[i].push(days[1]);

            teamUsedDays[j].push(days[0]);
            teamUsedDays[j].push(days[1]);
        }
    }

    return matches;
}