class TournamentMatches {
    constructor(tournament, matches) {
        this.tournament = tournament;
        this.matches = matches;
    }

    create() {
        let tournamentMatches = document.createElement('div');
        tournamentMatches.className = 'tournament-matches';

        let title = new Collapsible(this.tournament, '#fcc133', '#000000').create();
        let matchesUl = document.createElement('ul');

        Array.prototype.forEach.call(this.matches, match => {
            let matchLi = document.createElement('li');
            matchLi.appendChild(match.create());

            matchesUl.appendChild(matchLi);
        });

        tournamentMatches.appendChild(title);
        tournamentMatches.appendChild(matchesUl);

        return tournamentMatches;
    }
}