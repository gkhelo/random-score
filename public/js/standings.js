const Standings = {
    create(leagueStandings) {
        let mainDiv = document.createElement('div');

        let title = Collapsible.create('Leagues', '#fcc133', '#000000');

        let standingsUl = document.createElement('ul');
        leagueStandings.forEach(leagueStanding => {
            let standingsLi = document.createElement('li');
            let singleLeagueDiv = document.createElement('div');
            singleLeagueDiv.className = 'single-league';

            let table = this.createTable(leagueStanding, 'none', [-1]);

            singleLeagueDiv.appendChild(this.createButton(leagueStanding.name, table));
            singleLeagueDiv.appendChild(table);

            standingsLi.appendChild(singleLeagueDiv);
            standingsUl.appendChild(standingsLi);
        });
        
        mainDiv.appendChild(title);
        mainDiv.appendChild(standingsUl);
        return mainDiv;
    },

    update(leagueStandings) {
        leagueStandings.forEach(leagueStanding => {
            let contentDiv = document.getElementById(leagueStanding.id)
            contentDiv.innerHTML = '';

            this.addResults(contentDiv, leagueStanding);
        });
    },

    createButton(title, table) {
        let btn = document.createElement('div');
        btn.className = 'collapsible-league-table';
        btn.innerText = title;

        btn.addEventListener('click', function() {
            if (table.style.display === 'none') {
                table.style.display = 'block';
            } else {
                table.style.display = 'none';
            }
        });

        return btn;
    },

    createTable(leagueStanding, display, selectedTeamIds) {
        let tableDiv = document.createElement('div');
        tableDiv.className = 'league-table';
        tableDiv.style.display = display;

        let table = document.createElement('table');

        table.appendChild(this.createTableHeader());
        table.appendChild(this.createTableContent(leagueStanding, selectedTeamIds));

        tableDiv.appendChild(table);
        return tableDiv;
    },

    createTableHeader() {
        let tr = document.createElement('tr');
        tr.className = 'league-table-header';
        tr.innerHTML = `
            <th>#</th>
            <th>Team</th>
            <th>GP</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>GD</th>
            <th>PTS</th>
        `;

        return tr;
    },

    createTableContent(leagueStanding, selectedTeamIds) {
        let contentDiv = document.createElement('div');
        contentDiv.style.display = 'contents';
        contentDiv.id = leagueStanding.id;

        this.addResults(contentDiv, leagueStanding, selectedTeamIds);

        return contentDiv;
    },

    addResults(contentDiv, leagueStanding, selectedTeamIds) {
        let position = 0;
        leagueStanding.standings.forEach(result => {
            position++;
            contentDiv.appendChild(this.createResult(
                result, position, 
                this.getClassName(position, leagueStanding.promotions, leagueStanding.relegations, leagueStanding.standings.length),
                selectedTeamIds));
        });
    },

    createResult(result, position, className, selectedTeamIds) {
        let tr = document.createElement('tr');
        tr.className = className;
        if (selectedTeamIds.includes(result.team._id)) {
            tr.classList.add('league-table-selected');
        }
        tr.innerHTML = `
            <td>${position}</td>
            <td>${result.team.name}</td>
            <td>${result.matches}</td>
            <td>${result.win}</td>
            <td>${result.draw}</td>
            <td>${result.lost}</td>
            <td>${result.diff}</td>
            <td>${result.points}</td>
        `;

        return tr;
    },

    getClassName(position, promotions, relegations, length) {
        if (position <= promotions) {
            return 'league-table-promotion';
        } else if (position >= length - relegations + 1) {
            return 'league-table-relegation';
        }

        return 'league-table-normal';
    }
}