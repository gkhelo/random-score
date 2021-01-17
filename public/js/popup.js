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
                <div class="team-info-name">${info.team.name}</div>
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
            matchesDiv.appendChild(Match.createSingleMatch(match));
        });

        return matchesDiv;
    },

    standingsContent(standings, teamId) {
        let standingsDiv = document.createElement('div');

        standingsDiv.appendChild(Standings.createTable(standings, 'block', teamId));

        return standingsDiv;
    }
}

const MatchPopup = {
    content(info) {
        let content = document.createElement('div');
        content.innerHTML = `<p style="padding-left: 15px">${info}</p>`;
        return content;
    }
}