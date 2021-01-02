const Simulator = {
    fetchLiveMatches() {
        fetch('/api/matches/live')
            .then(response => response.json())
            .then(liveMatches => {
                liveMatches.forEach(match => {
                    Match.update(match);
                });
            })
            .catch(error => {
                console.log('Error occured during rendering matches:', error);
            });
    },

    start() {
        setInterval(this.fetchLiveMatches, 1000);
    }
}