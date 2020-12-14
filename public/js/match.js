class Match {
    constructor(homeTeam, homeLogo, homeScore, 
                guestTeam, guestLogo, guestScore,
                startTime, currentTime, status) {
        this.homeTeam = homeTeam;
        this.homeLogo = homeLogo;
        this.homeScore = homeScore;

        this.guestTeam = guestTeam;
        this.guestLogo = guestLogo;
        this.guestScore = guestScore;

        this.startTime = startTime;
        this.currentTime = currentTime;
        this.status = status;
    }

    create() {
        let match = document.createElement('div');
        match.className = 'match';

        this.statusDiv = this.createStatus();
        this.homeTeamDiv = this.createTeam(this.homeTeam, this.homeScore > this.guestScore);
        this.homeLogoDiv = this.createLogo(this.homeLogo);
        this.scoreDiv = this.createScore();
        this.guestLogoDiv = this.createLogo(this.guestLogo);
        this.guestTeamDiv = this.createTeam(this.guestTeam, this.homeScore < this.guestScore);

        match.appendChild(this.statusDiv);
        match.appendChild(this.homeTeamDiv);
        match.appendChild(this.homeLogoDiv);
        match.appendChild(this.scoreDiv);
        match.appendChild(this.guestLogoDiv);
        match.appendChild(this.guestTeamDiv);

        return match;
    }

    updateScore(homeScore, guestScore) {
        this.homeScore = homeScore;
        this.guestScore = guestScore;
        this.scoreDiv.innerText = this.homeScore + ' - ' + this.guestScore;
    }

    finish() {
        this.statusDiv.innerText = 'Finished';
        this.statusDiv.classList.remove('match-live');

        if (this.homeScore > this.guestScore) {
            this.homeTeamDiv.style.fontWeight = 'bold';
        } else if (this.homeScore < this.guestScore) {
            this.guestTeamDiv.style.fontWeight = 'bold';
        }

        this.scoreDiv.classList.remove('match-live');
    }

    // helper methods
    createStatus() {
        let status = document.createElement('div');
        status.className = 'match-status';

        if (this.status == -1) {
            status.innerText = this.startTime;
        } else if (this.status == 1) {
            status.innerText = 'Finished';
        } else {
            status.innerText = this.currentTime;
            status.classList.add('match-live');

            let blinker = document.createElement('span');
            blinker.innerText = "'";
            blinker.className = 'blinker';

            status.appendChild(blinker);
        }

        return status;
    }

    createTeam(name, isWinner) {
        let team = document.createElement('div');
        team.className = 'match-team';
        team.innerText = name;

        if (this.status == 1 && isWinner) {
            team.style.fontWeight = 'bold';
        }

        return team;
    }

    createLogo(logo) {
        let logoWrapper = document.createElement('div');
        logoWrapper.className = 'team-logo-wrapper';
        
        let img = document.createElement('img');
        img.src = logo;
        img.className = 'team-logo';

        logoWrapper.appendChild(img);
        return logoWrapper;
    }

    createScore() {
        let score = document.createElement('div');
        score.className = 'match-score';

        if (this.status == -1) {
            score.innerText = 'Preview';
        } else {
            score.innerText = this.homeScore + ' - ' + this.guestScore;
            
            if (this.status == 0) {
                score.classList.add('match-live');
            }
        }

        return score;
    }
}