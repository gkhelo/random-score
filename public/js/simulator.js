const Simulator = {
    fetchLiveMatches() {
        fetch('/api/matches/live')
            .then(response => response.json())
            .then(liveMatches => {
                let checkedStatuses = MatchesFilter.getCheckedStatuses();
                
                liveMatches.forEach(match => {
                    if (checkedStatuses.includes(match.status)) {
                        Match.update(match);
                    } else {
                        Match.hide(match);
                    }
                });
            })
            .catch(error => {
                console.log('Error occured during rendering matches:', error);
            });
    },

    fetchStandings() {
        fetch('/api/standings')
            .then(response => response.json())
            .then(leagueStandings => {
                Standings.update(leagueStandings);
            })
            .catch(error => {
                console.log('Error occured during rendering standings:', error);
            });
    },

    start() {
        setInterval(this.fetchLiveMatches, 1000);
        setInterval(this.fetchStandings, 60000);
    }
}