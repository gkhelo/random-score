const Team = {
    fetchTeamInfo(teamId, cb) {
        fetch('/api/team/' + teamId)
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
            });
    }
}