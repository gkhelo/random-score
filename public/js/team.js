const Team = {
    fetchTeamInfo(id, cb) {
        fetch('/api/team/' + id)
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
            });
    },

    fetchTeamInfoByName(name, cb) {
        fetch('/api/team/name/' + name)
            .then(response => response.json())
            .then(cb)
            .catch(error => {
                console.log('Error occured during fetching team info:', error);
            });
    },

    updateTeamFavourite(id) {
        fetch('/api/team/favourite/' + id, { method: 'POST'} )
            .catch(error => {
                console.log('Error occured during updating team favourite info:', error);
            });
    }
}