var fs = require('fs');
var path = require('path');
var async = require('async');

var League = require('./models/league');
var Team = require('./models/team');
var Match = require('./models/match');

var generator = require('./services/generator');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var leaguesMap = new Map();
var leagues = [];
var teams = [];

function leagueCreate(id, name, promotions, relegations, cb) {
    let league = new League({
        name: name,
        promotions: promotions,
        relegations: relegations 
    });

    league.save(err => {
        if (err) {
            console.log('Error occurred during league creation', err);
            cb(err, null);
            return;
        }

        leaguesMap[id] = league;
        leagues.push(league);
        cb(null, league);
    });
}

function teamCreate(name, code, logo, league, cb) {
    let team = new Team({
        name: name,
        code: code,
        logo: logo,
        league: league
    });

    team.save(err => {
        if (err) {
            console.log('Error occurred during team creation', err);
            cb(err, null);
            return;
        }

        teams.push(team);
        cb(null, team);
    })
}

function matchCreate(league, homeTeam, guestTeam, day, time, cb) {
    let match = new Match({
        league: league,
        homeTeam: homeTeam,
        guestTeam: guestTeam,
        day: day,
        time: time
    });

    match.save(err => {
        if (err) {
            console.log('Error occurred during match creation', err);
            cb(err, null);
            return;
        }

        cb(null, match);
    })
}

function createLeagues(callback) {
    let leaguesPath = path.join(__dirname, './data/leagues.json')
    let leagues = JSON.parse(fs.readFileSync(leaguesPath));

    let creates = [];
    leagues.forEach(league => {
        creates.push(function(cb) {
            leagueCreate(league.id, league.name, league.promotions, league.relegations, cb)
        });
    });

    async.parallel(creates, callback);
}

function createTeams(callback) {
    let teamsPath = path.join(__dirname, './data/teams.json')
    let teams = JSON.parse(fs.readFileSync(teamsPath));

    let creates = [];
    teams.forEach(team => {
        creates.push(function(cb) {
            teamCreate(team.name, team.code, team.logo, leaguesMap[team.league_id], cb)
        });
    });

    async.parallel(creates, callback);
}

function createMatches(callback) {
    let creates = [];
    leagues.forEach(league => {
        let teams = getLeagueTeams(league);
        let matches = generator.schedule(teams);

        matches.forEach(match => {
            creates.push(function(cb) {
                matchCreate(league, match.home, match.guest, match.day, match.time, cb);
            });
        })
    })

    async.parallel(creates, callback);
}

// helper functions start
function getLeagueTeams(league) {
    let result = [];
    teams.forEach(team => {
        if (team.league === league) {
            result.push(team);
        }
    })
    return result;
}
// helper functions end

async.series([
    createLeagues,
    createTeams,
    createMatches
],
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }

    // All done, disconnect from database
    mongoose.connection.close();
});