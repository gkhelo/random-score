const Team = {
    fetchTeamInfo(id, cb) {
        fetch(Server.getUrl('/api/team/' + id))
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
            });
    },

    fetchTeamInfoByName(name, cb) {
        fetch(Server.getUrl('/api/team/name/' + name))
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
                cb(JSON.stringify({
                    status: 'error'
                }));
            });
    },

    updateTeamFavourite(id) {
        if (Server.isAvailable) {
            fetch('/api/team/favourite/' + id, { method: 'POST'} )
                .catch(error => {
                    console.log('Error occured during updating team favourite info:', error);
                });
        }
    }
}