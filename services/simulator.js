var matchController = require('../controllers/matchController');

var utils = require('./utils');

var day = 1, hour = 14, minute = 55;
var interval;

function logTime() {
    console.log('day:', day, 'time:', utils.getTime(hour, minute));
}

function updateDay() {
    if (hour == 24) {
        day++;
        hour = 14;
    }

    if (day == 2) {
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

    logTime()
}

function startMatches() {
    matchController.startMatches(day, utils.getTime(hour, minute));
}

function updateMatches() {
    matchController.getByStatus('INPLAY', matches => {
        matches.forEach(match => {
            match.minute++;

            let goal = utils.randomGoal();
            if (goal == 'H') {
                match.homeScore++;
            } else if (goal == 'G') {
                match.guestScore++;
            }

            if (match.minute == 90) {
                match.status = 'FINISHED';
            }

            match.save();
        });
    });
}

function go() {
    updateTime();

    startMatches();
    
    updateMatches();
}

exports.start = function() {
    matchController.startup();

    interval = setInterval(go, 1000);
}

exports.day = day;