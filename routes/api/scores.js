const express = require('express');
const router = express.Router();

const matches = require('../../data/matches');
const leagues = require('../../data/leagues');
const teams = require('../../data/teams');

router.get('/league_matches', (req, res) => {
    let leagueMatches = new Map();

    matches.forEach(match => {
        let home = getTeam(match.homeId);
        let homeName = home.name;
        let homeLogo = getTeamLogo(home.id);
        let guest = getTeam(match.guestId);
        let guestName = guest.name;
        let guestLogo = getTeamLogo(guest.id);
        
        if (leagueMatches.has(match.leagueId)) {
            leagueMatches.get(match.leagueId).push({
                id: match.leagueId,
                homeName: homeName,
                homeLogo: homeLogo,
                homeScore: match.homeScore,
                guestName: guestName,
                guestLogo: guestLogo,
                guestScore: match.guestScore,
                startTime: match.startTime,
                currentTime: match.currentTime,
                status: match.status
            });
        } else {
            leagueMatches.set(match.leagueId, [{
                id: match.leagueId,
                homeName: homeName,
                homeLogo: homeLogo,
                homeScore: match.homeScore,
                guestName: guestName,
                guestLogo: guestLogo,
                guestScore: match.guestScore,
                startTime: match.startTime,
                currentTime: match.currentTime,
                status: match.status
            }]);
        }
        // console.log(leagueMatches);
    });

    res.send(JSON.stringify([...leagueMatches]));
});

function getTeam(id) {
    return teams.filter(team => team.id == id)[0];
}

function getLeague(id) {
    return leagues.filter(league => league.id == id)[0];
}

function getTeamLogo(id) {
    return './images/logos/arsenal.png';
}

const responseTemplate = {
    id: 1, // league id
    matches: [
        {
            id: 1,
            homeName: '',
            homeLogo: '',
            homeScore: 2,
            guestName: '',
            guestLogo: '',
            guestScore: 1,
            startTime: '20:00',
            currentTime: 75,
            status: 0
        },
        {
            id: 2,
            homeName: '',
            homeLogo: '',
            homeScore: 2,
            guestName: '',
            guestLogo: '',
            guestScore: 1,
            startTime: '20:00',
            currentTime: 0,
            status: 1
        }
    ]
};

module.exports = router;