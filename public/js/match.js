const Match = {
    create(match) {
        let matchDiv = document.createElement('div');
        matchDiv.className = 'match';

        let statusDiv = this.createStatus(match);
        let homeTeamDiv = this.createTeam(match.homeName, match.homeScore > match.guestScore, match.status);
        let homeLogoDiv = this.createLogo(match.homeLogo);
        let scoreDiv = this.createScore(match.homeScore, match.guestScore, match.status);
        let guestLogoDiv = this.createLogo(match.guestLogo);
        let guestTeamDiv = this.createTeam(match.guestName, match.homeScore < match.guestScore, match.status);

        matchDiv.appendChild(statusDiv);
        matchDiv.appendChild(homeTeamDiv);
        matchDiv.appendChild(homeLogoDiv);
        matchDiv.appendChild(scoreDiv);
        matchDiv.appendChild(guestLogoDiv);
        matchDiv.appendChild(guestTeamDiv);

        return matchDiv;
    },

    // updateScore(homeScore, guestScore) {
    //     this.homeScore = homeScore;
    //     this.guestScore = guestScore;
    //     this.scoreDiv.innerText = this.homeScore + ' - ' + this.guestScore;
    // }

    // finish() {
    //     this.statusDiv.innerText = 'Finished';
    //     this.statusDiv.classList.remove('match-live');

    //     if (this.homeScore > this.guestScore) {
    //         this.homeTeamDiv.style.fontWeight = 'bold';
    //     } else if (this.homeScore < this.guestScore) {
    //         this.guestTeamDiv.style.fontWeight = 'bold';
    //     }

    //     this.scoreDiv.classList.remove('match-live');
    // }

    // helper methods
    createStatus(match) {
        let statusDiv = document.createElement('div');
        statusDiv.className = 'match-status';

        let status = match.status;
        if (status == -1) {
            statusDiv.innerText = match.startTime;
        } else if (status == 1) {
            statusDiv.innerText = 'Finished';
        } else {
            statusDiv.innerText = match.currentTime;
            statusDiv.classList.add('match-live');

            let blinker = document.createElement('span');
            blinker.innerText = "'";
            blinker.className = 'blinker';

            statusDiv.appendChild(blinker);
        }

        return statusDiv;
    },

    createTeam(name, isWinner, status) {
        let teamDiv = document.createElement('div');
        teamDiv.className = 'match-team';
        teamDiv.innerText = name;

        if (status == 1 && isWinner) {
            teamDiv.style.fontWeight = 'bold';
        }

        return teamDiv;
    },

    createLogo(logo) {
        let logoWrapper = document.createElement('div');
        logoWrapper.className = 'team-logo-wrapper';
        
        let img = document.createElement('img');
        img.src = logo;
        img.className = 'team-logo';

        logoWrapper.appendChild(img);
        return logoWrapper;
    },

    createScore(homeScore, guestScore, status) {
        let scoreDiv = document.createElement('div');
        scoreDiv.className = 'match-score';

        if (status == -1) {
            scoreDiv.innerText = 'Preview';
        } else {
            scoreDiv.innerText = homeScore + ' - ' + guestScore;
            
            if (status == 0) {
                scoreDiv.classList.add('match-live');
            }
        }

        return scoreDiv;
    }
}