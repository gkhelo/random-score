const Render = {
    matches() {
        fetch('/api/league_matches')
            .then(response => response.json())
            .then(allLeagueMatches => {
                let allMatchesDiv = document.getElementById('matches');

                allLeagueMatches.forEach(leagueMatches => {
                    allMatchesDiv.appendChild(LeagueMatches.create(leagueMatches));
                });
            })
            .catch(error => {
                console.log('Error occured during fetching matches from server:', error);
            });
    },

    standings() {
        fetch('/api/league_standings')
            .then(response => response.json())
            .then(allLeagueStandings => {
                let allStandingsDiv = document.getElementById('standings');

                allLeagueStandings.forEach(leagueStandings => {
                    console.log(leagueStandings);
                    allStandingsDiv.appendChild(LeagueStandings.create(leagueStandings));
                });
            })
            .catch(error => {
                console.log('Error occured during fetching standings from server:', error);
            });
    }
}