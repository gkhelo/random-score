const Popup = {
    show(title, content) {
        let wrapper = document.getElementById('popup-wrapper');
        if (wrapper != null) {
            document.body.removeChild(wrapper);
        }

        wrapper = document.createElement('div');
        wrapper.id = 'popup-wrapper';

        let popup = document.createElement('div');
        popup.className = 'popup';
        
        popup.appendChild(this.createHeader(title));
        popup.appendChild(content);
        
        wrapper.appendChild(popup);
        document.body.appendChild(wrapper);
    },

    createHeader(title) {
        let header = document.createElement('div');
        header.className = 'popup-header';
    
        let titleDiv = document.createElement('div');
        titleDiv.className = 'popup-title';
        titleDiv.innerText = title;

        let closeDiv = document.createElement('div');
        closeDiv.className = 'popup-close';
        closeDiv.appendChild(this.createCloseImage());

        header.appendChild(titleDiv);
        header.appendChild(closeDiv);

        return header;
    },

    createCloseImage() {
        let img = document.createElement('img');
        
        img.src = './images/close.png';
        img.addEventListener('click', () => {
            document.body.removeChild(document.getElementById('popup-wrapper'));
        });
        
        return img;
    }
}

const SearchBarPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Search Bar Content</p>';
        return content;
    }
}

const BestTeamsPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Teams Content</p>';
        return content;
    }
}

const BestLeaguesPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Leagues Content</p>';
        return content;
    }
}

const TeamPopup = {
    content(info) {
        let content = document.createElement('div');
        if (info.status != 'ok') {
            content.innerHTML = `
                <p style="padding-left: 15px">Error occurred during fetching team info</p>
            `;
        } else {
            content.className = 'team-info';
            content.id = 'team-info';

            content.innerHTML = `
                <div class="team-info-logo">
                    <img src="${info.team.logo}" />
                </div>
            `;

            content.appendChild(this.teamName(info.team));
            content.appendChild(this.tabs(info));
            content.appendChild(this.defaultTabContent(info));
        }

        return content;
    },

    teamName(team) {
        let teamNameDiv = document.createElement('div');
        teamNameDiv.className = 'team-info-name';

        teamNameDiv.innerHTML = `<div>${team.name}</div>`
        teamNameDiv.appendChild(this.star(team));
        
        return teamNameDiv;
    },

    star(team) {
        let starDiv = document.createElement('div');
        starDiv.className = 'star-wrapper';

        let img = document.createElement('img');
        if (team.favourite) {
            img.src = './images/star-selected.png';
        } else {
            img.src = './images/star.png';
        }

        img.addEventListener('click', () => {
            if (team.favourite) {
                img.src = './images/star.png';
                team.favourite = false;
            } else {
                img.src = './images/star-selected.png';
                team.favourite = true;
            }

            Team.updateTeamFavourite(team._id);
        });

        starDiv.appendChild(img);
        return starDiv;
    },

    tabs(info) {
        let tabsDiv = document.createElement('div');
        tabsDiv.className = 'team-info-tabs';

        tabsDiv.appendChild(this.tab('Results', 
            this.matchesContent(Match.filter(info.matches, 'FINISHED')), true));

        tabsDiv.appendChild(this.tab('Fixtures', 
            this.matchesContent(Match.filter(info.matches, 'NOT_STARTED')), false));

        tabsDiv.appendChild(this.tab('Standings', 
            this.standingsContent(info.standings, info.team._id), false));

        return tabsDiv;
    },

    tab(name, content, defaultTab) {
        let tabDiv = document.createElement('div');
        tabDiv.className = 'team-info-tab';
        tabDiv.innerHTML = name;

        if (defaultTab) {
            this.selectTab(tabDiv, content);
        }
        tabDiv.addEventListener('click', () => {
            this.deselectTab();
            this.selectTab(tabDiv, content);
            this.updateTabContent(content);
        });

        return tabDiv;
    },

    selectTab(tabDiv) {
        tabDiv.classList.add('team-info-tab-selected');
    },

    deselectTab() {
        let tabs = document.getElementsByClassName('team-info-tab');
        
        Array.prototype.forEach.call(tabs, tab => {
            tab.classList.remove('team-info-tab-selected');
        })
    },

    defaultTabContent(info) {
        let contentDiv = document.createElement('div');
        contentDiv.className = 'team-info-content';
        contentDiv.id = 'team-info-content';

        // default content is FINISHED matches
        contentDiv.appendChild(this.matchesContent(Match.filter(info.matches, 'FINISHED')));

        return contentDiv;
    },

    updateTabContent(content) {
        let contentDiv = document.getElementById('team-info-content');
        contentDiv.innerHTML = '';

        contentDiv.appendChild(content);
    },

    matchesContent(matches) {
        let matchesDiv = document.createElement('div');

        matches.forEach(match => {
            matchesDiv.appendChild(Match.createSingleMatch(match, true));
        });

        return matchesDiv;
    },

    standingsContent(standings, teamId) {
        let standingsDiv = document.createElement('div');

        standingsDiv.appendChild(Standings.createTable(standings, 'block', [teamId]));

        return standingsDiv;
    }
}

const MatchPreviewPopup = {
    content(info) {
        let content = document.createElement('div');
        if (info.status != 'ok') {
            content.innerHTML = `
                <p style="padding-left: 15px">Error occurred during fetching match preview</p>
            `;
        } else {
            content.className = 'team-info';
            content.id = 'team-info';

            content.innerHTML = `
                <div class="match-details">
                    <div class="main-match">
                        <div class="team-logo-wrapper">
                            <img src="${info.match.homeTeam.logo}" class="team-logo" id="${info.match.homeTeam.id}">
                        </div>
                        <div class="match-status">${info.match.time}</div>
                        <div class="team-logo-wrapper">
                            <img src="${info.match.guestTeam.logo}" class="team-logo" id="${info.match.guestTeam.id}">
                        </div>
                    </div>
                </div>
            `;

            content.appendChild(this.tabs(info));
            content.appendChild(this.defaultTabContent(info));
        }

        return content;
    },

    tabs(info) {
        let tabsDiv = document.createElement('div');
        tabsDiv.className = 'team-info-tabs';

        tabsDiv.appendChild(this.tab('Results',
            this.matchesContent(info.homeMatches, info.guestMatches), true));

        tabsDiv.appendChild(this.tab('Standings', 
            this.standingsContent(info.standings, info.match.homeTeam._id, info.match.guestTeam._id), false));

        return tabsDiv;
    },

    tab(name, content, defaultTab) {
        let tabDiv = document.createElement('div');
        tabDiv.className = 'team-info-tab';
        tabDiv.innerHTML = name;

        if (defaultTab) {
            this.selectTab(tabDiv, content);
        }
        tabDiv.addEventListener('click', () => {
            this.deselectTab();
            this.selectTab(tabDiv, content);
            this.updateTabContent(content);
        });

        return tabDiv;
    },

    selectTab(tabDiv) {
        tabDiv.classList.add('team-info-tab-selected');
    },

    deselectTab() {
        let tabs = document.getElementsByClassName('team-info-tab');
        
        Array.prototype.forEach.call(tabs, tab => {
            tab.classList.remove('team-info-tab-selected');
        })
    },

    defaultTabContent(info) {
        let contentDiv = document.createElement('div');
        contentDiv.className = 'team-info-content';
        contentDiv.id = 'team-info-content';

        // default content is FINISHED matches
        contentDiv.appendChild(this.matchesContent(info.homeMatches, info.guestMatches));

        return contentDiv;
    },

    updateTabContent(content) {
        let contentDiv = document.getElementById('team-info-content');
        contentDiv.innerHTML = '';

        contentDiv.appendChild(content);
    },

    matchesContent(homeMatches, guestMatches) {
        let matchesDiv = document.createElement('div');
        matchesDiv.className = 'double-matches';

        let homeMatchesDiv = document.createElement('div');
        homeMatches.forEach(match => {
            homeMatchesDiv.appendChild(Match.createMiniSingleMatch(match));
        });

        let guestMatchesDiv = document.createElement('div');
        guestMatches.forEach(match => {
            guestMatchesDiv.appendChild(Match.createMiniSingleMatch(match));
        });

        matchesDiv.appendChild(homeMatchesDiv);
        matchesDiv.appendChild(guestMatchesDiv);

        return matchesDiv;
    },

    standingsContent(standings, homeTeamId, guestTeamId) {
        let standingsDiv = document.createElement('div');

        standingsDiv.appendChild(
            Standings.createTable(standings, 'block', [homeTeamId, guestTeamId]));

        return standingsDiv;
    }
}