const Render = {
    matches() {
        fetch('/api/matches/filter/1')
            .then(response => response.json())
            .then(allLeagueMatches => {
                let allMatchesDiv = document.getElementById('matches');

                allLeagueMatches.forEach(leagueMatches => {
                    allMatchesDiv.appendChild(Match.create(leagueMatches));
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