const Match = {
    create(leagueMatches) {
        let leagueMatchesDiv = document.createElement('div');
        leagueMatchesDiv.className = 'league-matches';

        let title = Collapsible.create(leagueMatches.name, '#fcc133', '#000000');
        let matchesUl = document.createElement('ul');

        leagueMatches.matches.forEach(match => {
            let matchLi = document.createElement('li');
            matchLi.appendChild(this.createSingleMatch(match));

            matchesUl.appendChild(matchLi);
        });

        leagueMatchesDiv.appendChild(title);
        leagueMatchesDiv.appendChild(matchesUl);

        return leagueMatchesDiv;
    },

    createSingleMatch(match) {
        let matchDiv = document.createElement('div');
        matchDiv.className = 'match';
        matchDiv.id = match._id;

        let statusDiv = this.createStatus(match);

        let isHomeWinner = false;
        if (match.status == 'FINISHED' && match.homeScore > match.guestScore) {
            isHomeWinner = true;
        }
        let homeTeamDiv = this.createTeam(match.homeTeam, isHomeWinner);

        let homeLogoDiv = this.createLogo(match.homeTeam);
        let scoreDiv = this.createScore(match.homeScore, match.guestScore, match.status);
        let guestLogoDiv = this.createLogo(match.guestTeam);

        let isGuestWinner = false;
        if (match.status == 'FINISHED' && match.homeScore < match.guestScore) {
            isGuestWinner = true;
        }
        let guestTeamDiv = this.createTeam(match.guestTeam, isGuestWinner);

        matchDiv.appendChild(statusDiv);
        matchDiv.appendChild(homeTeamDiv);
        matchDiv.appendChild(homeLogoDiv);
        matchDiv.appendChild(scoreDiv);
        matchDiv.appendChild(guestLogoDiv);
        matchDiv.appendChild(guestTeamDiv);

        return matchDiv;
    },

    update(match) {
        let matchDiv = document.getElementById(match._id);
        let childs = matchDiv.children;

        this.updateStatus(match, childs[0]);

        if (match.status == 'FINISHED') {
            let diff = match.homeScore - match.guestScore;
            if (diff > 0) {
                this.boldTeamDiv(childs[1]);
            } else if (diff < 0) {
                this.boldTeamDiv(childs[5]);
            }
        }
        this.updateScore(match.homeScore, match.guestScore, match.status, childs[3]);
    },

    createStatus(match) {
        let statusDiv = document.createElement('div');
        statusDiv.className = 'match-status';

        this.updateStatus(match, statusDiv);

        return statusDiv;
    },

    updateStatus(match, statusDiv) {
        let status = match.status;
        if (status == 'NOT_STARTED') {
            statusDiv.innerText = match.time;
        } else if (status == 'FINISHED') {
            statusDiv.innerText = 'Finished';
            statusDiv.classList.remove('match-live');
        } else {
            statusDiv.innerText = match.minute;
            statusDiv.classList.add('match-live');

            let blinker = document.createElement('span');
            blinker.innerText = "'";
            blinker.className = 'blinker';

            statusDiv.appendChild(blinker);
        }
    },

    createTeam(team, bold) {
        let teamDiv = document.createElement('div');
        teamDiv.className = 'match-team';
        teamDiv.id = team._id;
        teamDiv.innerText = team.name;

        if (bold) {
            this.boldTeamDiv(teamDiv);
        }

        return teamDiv;
    },

    boldTeamDiv(teamDiv) {
        teamDiv.style.fontWeight = 'bold';
    },

    createLogo(team) {
        let logoWrapper = document.createElement('div');
        logoWrapper.className = 'team-logo-wrapper';
        
        let img = document.createElement('img');
        img.src = team.logo;
        img.className = 'team-logo';
        img.id = team._id;

        logoWrapper.appendChild(img);
        return logoWrapper;
    },

    createScore(homeScore, guestScore, status) {
        let scoreDiv = document.createElement('div');
        scoreDiv.className = 'match-score';

        if (status == 'NOT_STARTED') {
            scoreDiv.innerText = 'Preview';
        } else {
            this.updateScore(homeScore, guestScore, status, scoreDiv);
        }

        return scoreDiv;
    },

    updateScore(homeScore, guestScore, status, scoreDiv) {
        if (status == 'INPLAY') {
            scoreDiv.classList.add('match-live');
        } else if (status == 'FINISHED') {
            scoreDiv.classList.remove('match-live');
        }

        scoreDiv.innerText = homeScore + ' - ' + guestScore;
    }
}