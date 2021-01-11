const Team = {
    fetchTeamInfo(id, cb) {
        fetch('/api/team/' + id)
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
            });
    }
}