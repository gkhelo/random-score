var fs = require('fs');
var path = require('path');
var async = require('async');

var League = require('./models/league');
var Team = require('./models/team');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/test';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var leagues = new Map();

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

        leagues[id] = league;
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

        cb(null, team);
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
            teamCreate(team.name, team.code, team.logo, leagues[team.league_id], cb)
        });
    });

    async.parallel(creates, callback);
}

async.series([
    createLeagues,
    createTeams
],
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }

    // All done, disconnect from database
    mongoose.connection.close();
});