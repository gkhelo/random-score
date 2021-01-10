var matchController = require('../controllers/matchController');
var resultController = require('../controllers/resultController');

var utils = require('./utils');
var random = require('./random');

var day = 6, hour = 14, minute = 55;
var interval;

function logTime() {
    console.log('day:', day, 'time:', utils.getTime(hour, minute));
}

function updateDay() {
    if (hour == 24) {
        day++;
        hour = 14;
        minute = 55;
    }

    if (day == 61) {
        clearInterval(interval);
    }
}

function updateHour() {
    if (minute == 60) {
        hour++;
        minute = 0;
    }
}

function updateMinute() {
    minute++;
}

function updateTime() {
    updateMinute();
    updateHour();
    updateDay();

    logTime();
}

function startMatches() {
    matchController.startMatches(day, utils.getTime(hour, minute));
}

function updateMatches() {
    matchController.getByStatus('INPLAY', matches => {
        matches.forEach(match => {
            match.minute++;

            let goal = random.goal();
            if (goal == 'H') {
                match.homeScore++;
            } else if (goal == 'G') {
                match.guestScore++;
            }

            if (match.minute == 90) {
                match.status = 'FINISHED';
                saveResults(match);
            }

            match.save();
        });
    });
}

function saveResults(match) {
    resultController.update(match.homeTeam, match.league, utils.getResult(match.homeScore, match.guestScore), match.homeScore - match.guestScore);
    resultController.update(match.guestTeam, match.league, utils.getResult(match.guestScore, match.homeScore), match.guestScore - match.homeScore);
}

function go() {
    updateTime();

    startMatches();
    
    updateMatches();
}

exports.start = function() {
    matchController.startup();
    resultController.startup();

    interval = setInterval(go, 1000);
}

exports.getDay = function() {
    return day;
}

exports.getHour = function() {
    return hour;
}

exports.getMinute = function() {
    return minute;
}