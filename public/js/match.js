const Match = {
    create(leagueMatches) {
        let leagueMatchesDiv = document.createElement('div');
        leagueMatchesDiv.className = 'league-matches';

        let title = Collapsible.create(leagueMatches.name, '#3eb650', '#000000');
        let matchesUl = document.createElement('ul');

        leagueMatches.matches.forEach(match => {
            let matchLi = document.createElement('li');
            matchLi.appendChild(this.createSingleMatch(match, false));

            matchesUl.appendChild(matchLi);
        });

        leagueMatchesDiv.appendChild(title);
        leagueMatchesDiv.appendChild(matchesUl);

        return leagueMatchesDiv;
    },

    createSingleMatch(match, showDay) {
        let matchDiv = document.createElement('div');
        matchDiv.className = 'match';
        matchDiv.id = match._id;

        let statusDiv = this.createStatus(match, showDay);

        let isHomeWinner = false;
        if (match.status == 'FINISHED' && match.homeScore > match.guestScore) {
            isHomeWinner = true;
        }
        let homeTeamDiv = this.createTeam(match.homeTeam, isHomeWinner, false);

        let homeLogoDiv = this.createLogo(match.homeTeam);
        let scoreDiv = this.createScore(match._id, match.homeScore, match.guestScore, match.status);
        let guestLogoDiv = this.createLogo(match.guestTeam);

        let isGuestWinner = false;
        if (match.status == 'FINISHED' && match.homeScore < match.guestScore) {
            isGuestWinner = true;
        }
        let guestTeamDiv = this.createTeam(match.guestTeam, isGuestWinner, false);

        matchDiv.appendChild(statusDiv);
        matchDiv.appendChild(homeTeamDiv);
        matchDiv.appendChild(homeLogoDiv);
        matchDiv.appendChild(scoreDiv);
        matchDiv.appendChild(guestLogoDiv);
        matchDiv.appendChild(guestTeamDiv);

        return matchDiv;
    },

    createMiniSingleMatch(match) {
        let matchDiv = document.createElement('div');
        matchDiv.className = 'mini-match';
        matchDiv.id = match._id;

        let isHomeWinner = false;
        if (match.status == 'FINISHED' && match.homeScore > match.guestScore) {
            isHomeWinner = true;
        }
        let homeTeamDiv = this.createTeam(match.homeTeam, isHomeWinner, true);
        let homeLogoDiv = this.createLogo(match.homeTeam);

        let scoreDiv = this.createScore(match._id, match.homeScore, match.guestScore, match.status);
        
        let isGuestWinner = false;
        if (match.status == 'FINISHED' && match.homeScore < match.guestScore) {
            isGuestWinner = true;
        }
        let guestTeamDiv = this.createTeam(match.guestTeam, isGuestWinner, true);
        let guestLogoDiv = this.createLogo(match.guestTeam);

        matchDiv.appendChild(homeTeamDiv);
        matchDiv.appendChild(homeLogoDiv);
        matchDiv.appendChild(scoreDiv);
        matchDiv.appendChild(guestLogoDiv);
        matchDiv.appendChild(guestTeamDiv);

        return matchDiv;
    },

    update(match) {
        let matchDiv = document.getElementById(match._id);
        matchDiv.style.display = 'grid';
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
        if (match.status != 'NOT_STARTED') {
            this.updateScore(match.homeScore, match.guestScore, match.status, childs[3]);
        }
    },

    createStatus(match, showDay) {
        let statusDiv = document.createElement('div');
        statusDiv.className = 'match-status';

        this.updateStatus(match, statusDiv, showDay);

        return statusDiv;
    },

    updateStatus(match, statusDiv, showDay) {
        let status = match.status;
        if (status == 'NOT_STARTED') {
            if (showDay) {
                statusDiv.innerHTML = `Day ${match.day} - ${match.time}`;
            } else {
                statusDiv.innerHTML = match.time;
            }
        } else if (status == 'FINISHED') {
            if (showDay) {
                statusDiv.innerHTML = `Day ${match.day} - ${match.time}`;
            } else {
                statusDiv.innerText = 'Finished';
                statusDiv.classList.remove('match-live');
            }
        } else {
            statusDiv.innerText = match.minute;
            statusDiv.classList.add('match-live');

            let blinker = document.createElement('span');
            blinker.innerText = "'";
            blinker.className = 'blinker';

            statusDiv.appendChild(blinker);
        }
    },

    createTeam(team, bold, code) {
        let teamDiv = document.createElement('div');
        teamDiv.className = 'match-team';
        teamDiv.id = team._id;

        if (code) {
            teamDiv.innerText = team.code;
        } else {
            teamDiv.innerText = team.name;
        }

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

        img.addEventListener('click', () => {
            Team.fetchTeamInfo(img.id, info => {
                Popup.show('Team Info', TeamPopup.content(info));
            });
        });

        logoWrapper.appendChild(img);
        return logoWrapper;
    },

    createScore(matchId, homeScore, guestScore, status) {
        let scoreDiv = document.createElement('div');
        scoreDiv.className = 'match-score';
        scoreDiv.setAttribute('status', status)
        scoreDiv.addEventListener('click', () => {
            if (scoreDiv.getAttribute('status') == 'NOT_STARTED') {
                Match.fetchPreview(matchId, info => {
                    Popup.show('Match Preview', MatchPreviewPopup.content(info));
                })
            }
        });

        if (status == 'NOT_STARTED') {
            scoreDiv.classList.add('preview');
            scoreDiv.innerText = 'Preview';
        } else {
            scoreDiv.classList.remove('preview');
            this.updateScore(homeScore, guestScore, status, scoreDiv);
        }

        return scoreDiv;
    },

    updateScore(homeScore, guestScore, status, scoreDiv) {
        scoreDiv.setAttribute('status', status)
        if (status == 'INPLAY') {
            scoreDiv.classList.remove('preview');
            scoreDiv.classList.add('match-live');
        } else if (status == 'FINISHED') {
            scoreDiv.classList.remove('match-live');
        }

        scoreDiv.innerText = homeScore + ' - ' + guestScore;
    },

    hide(match) {
        let matchDiv = document.getElementById(match._id);
        matchDiv.style.display = 'none';
    },

    hideAll() {
        let matchDivs = document.getElementsByClassName('match');

        Array.prototype.forEach.call(matchDivs, matchDiv => {
            matchDiv.style.display = 'none';
        })
    },

    filter(matches, status) {
        let result = [];
        matches.forEach(match => {
            if (match.status == status) {
                result.push(match);
            }
        });
        return result;
    },

    fetchPreview(matchId, callback) {
        fetch('/api/matches/preview/' + matchId)
            .then(response => response.json())
            .then(callback)
            .catch(error => {
                console.log('Error occured during fetching match preview:', error);
            });
    }
}