const utils = {
    randomNumber(from, to) {
        return from + Math.floor(Math.random() * (to + 1));
    },

    randomUniqueNumbers(from, to, size) {
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
    },

    randomStatus() {
        let rand = this.randomNumber(0, 2);
        return -1 + rand;
    },

    time() {
        return '20:00';
    },

    wonDrawLost(games) {
        let won = utils.randomNumber(0, games);
        games -= won;
        let draw = utils.randomNumber(0, games);
        games -= draw;
        let lost = games;

        return [won, draw, lost];
    },

    goalsDiff(won, draw, lost) {
        return 2 * won - lost;
    },

    points(won, draw, lost) {
        return 3 * won + draw;
    },

    sortStandings(standings, league) {
        standings.sort((t1, t2) => t1.points < t2.points);
            
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
};

module.exports = utils;