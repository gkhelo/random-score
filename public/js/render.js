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
        // fetch('/api/league_standings')
        //     .then(response => response.json())
        //     .then(allLeagueStandings => {
        //         let allStandingsDiv = document.getElementById('standings');
        //         allStandingsDiv.appendChild(LeagueStandings.create(allLeagueStandings));
        //     })
        //     .catch(error => {
        //         console.log('Error occured during rendering standings:', error);
        //     });
    }
}