const Render = {
    matches() {
        fetch('/api/matches/filter/1')
            .then(response => response.json())
            .then(allLeagueMatches => {
                let mainDiv = document.getElementById('matches');

                let matchesDiv = document.createElement('div');
                matchesDiv.id = 'matches-div';
                allLeagueMatches.forEach(leagueMatches => {
                    matchesDiv.appendChild(Match.create(leagueMatches));
                });

                mainDiv.appendChild(MatchesFilter.create());
                mainDiv.appendChild(matchesDiv);
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