
import { getDay } from './time.js';
import { create as createSlideshow } from './slideshow.js';

export function render() {
    matches(getDay() || 1);
    standings();
    slideshow();
}

function matches(day) {
    fetch('/api/matches/filter/' + day)
        .then(response => response.json())
        .then(allLeagueMatches => {
            let mainDiv = document.getElementById('matches');
            mainDiv.innerHTML = '';

            mainDiv.appendChild(MatchesFilter.create(day));
            allLeagueMatches.forEach(leagueMatches => {
                mainDiv.appendChild(Match.create(leagueMatches));
            });
        })
        .catch(error => {
            console.log('Error occured during rendering matches:', error);
        });
}

function standings() {
    fetch('/api/standings')
        .then(response => response.json())
        .then(leagueStandings => {
            let allStandingsDiv = document.getElementById('standings');
            allStandingsDiv.appendChild(Standings.create(leagueStandings));
        })
        .catch(error => {
            console.log('Error occured during rendering standings:', error);
        });
}

function slideshow() {
    createSlideshow();
}
