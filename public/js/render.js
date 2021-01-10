const Render = {
    matches(day) {
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
    },

    standings() {
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
}