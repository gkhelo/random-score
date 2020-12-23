const LeagueMatches = {
    create(leagueMatches) {
        let leagueMatchesDiv = document.createElement('div');
        leagueMatchesDiv.className = 'league-matches';

        let title = new Collapsible(leagueMatches.name, '#fcc133', '#000000').create();
        let matchesUl = document.createElement('ul');

        leagueMatches.matches.forEach(match => {
            let matchLi = document.createElement('li');
            matchLi.appendChild(Match.create(match));

            matchesUl.appendChild(matchLi);
        });

        leagueMatchesDiv.appendChild(title);
        leagueMatchesDiv.appendChild(matchesUl);

        return leagueMatchesDiv;
    }
}