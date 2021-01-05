const Standings = {
    create(leagueStandings) {
        let mainDiv = document.createElement('div');

        let title = Collapsible.create('Leagues', '#fcc133', '#000000');

        let standingsUl = document.createElement('ul');
        leagueStandings.forEach(leagueStanding => {
            let standingsLi = document.createElement('li');
            let singleLeagueDiv = document.createElement('div');
            singleLeagueDiv.className = 'single-league';

            let table = this.createTable(leagueStanding.standings, leagueStanding.promotions, leagueStanding.relegations);

            singleLeagueDiv.appendChild(this.createButton(leagueStanding.name, table));
            singleLeagueDiv.appendChild(table);

            standingsLi.appendChild(singleLeagueDiv);
            standingsUl.appendChild(standingsLi);
        });
        
        mainDiv.appendChild(title);
        mainDiv.appendChild(standingsUl);
        return mainDiv;
    },

    createButton(title, table) {
        let btn = document.createElement('button');
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

    createTable(standings, promotions, relegations) {
        let tableDiv = document.createElement('div');
        tableDiv.className = 'league-table';
        tableDiv.style.display = 'none';

        let table = document.createElement('table');

        table.appendChild(this.createTableHeader());
        let position = 0;
        standings.forEach(result => {
            position++;
            table.appendChild(this.createResult(result, position, this.getClassName(position, promotions, relegations, standings.length)));
        });

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

    createResult(result, position, className) {
        let tr = document.createElement('tr');
        tr.className = className;
        tr.innerHTML = `
            <td>${position}</td>
            <td><img class="team-logo" src="${result.team.logo}" /></td>
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