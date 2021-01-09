const MatchesFilter = {
    create() {
        let mainDiv = document.createElement('div');
        mainDiv.className = 'matches-filter';

        let filtersUl = document.createElement('ul');
        filtersUl.appendChild(this.checkboxFilter('Scheduled', 'NOT_STARTED'));
        filtersUl.appendChild(this.checkboxFilter('Live', 'INPLAY'));
        filtersUl.appendChild(this.checkboxFilter('Finished', 'FINISHED'));

        mainDiv.appendChild(filtersUl);
        return mainDiv;
    },

    checkboxFilter(name, status) {
        let li = document.createElement('li');

        li.innerHTML = `<label for="${status}">${name}</label>`

        let input = document.createElement('input');
        input.className = 'matches-checkbox'
        input.type = 'checkbox';
        input.value = status;
        input.checked = true;
        input.addEventListener('change', () => {
            let checkboxes = document.getElementsByClassName('matches-checkbox');

            let statuses = []
            Array.prototype.forEach.call(checkboxes, checkbox => {
                if (checkbox.checked) {
                    statuses.push(checkbox.value);
                }
            })

            this.filterMatches(statuses);
        });

        li.appendChild(input)
        return li;
    },

    filterMatches(statuses) {
        json = JSON.stringify(statuses);
        fetch('/api/matches/filter/1/' + json)
            .then(response => response.json())
            .then(allLeagueMatches => {
                let matchesDiv = document.getElementById('matches-div');
                matchesDiv.innerHTML = '';
                
                allLeagueMatches.forEach(leagueMatches => {
                    matchesDiv.appendChild(Match.create(leagueMatches));
                });
            })
            .catch(error => {
                console.log('Error occured during rendering matches:', error);
            });
    }
}