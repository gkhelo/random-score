const LeagueStandings = {
    create(leagueStandings) {
        let mainDiv = document.createElement('div');

        let title = Collapsible.create('Leagues', '#fcc133', '#000000');

        let standingsUl = document.createElement('ul');
        leagueStandings.forEach(leagueStanding => {
            let standingsLi = document.createElement('li');
            let singleLeagueDiv = document.createElement('div');
            singleLeagueDiv.className = 'single-league';

            let table = this.createTable(leagueStanding.standings, leagueStanding.name);

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

    createTable(standings) {
        let tableDiv = document.createElement('div');
        tableDiv.className = 'league-table';
        tableDiv.style.display = 'none';

        let table = document.createElement('table');

        table.appendChild(this.createTableHeader());
        let position = 0;
        standings.forEach(team => {
            position++;
            table.appendChild(this.createTeamInfo(team, position));
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

    createTeamInfo(team, position) {
        let tr = document.createElement('tr');
        if (team.status == 0) {
            tr.className = 'league-table-relegation';
        } else if (team.status == 1) {
            tr.className = 'league-table-normal';
        } else {
            tr.className = 'league-table-promotion';
        }
        tr.innerHTML = `
            <td>${position}</td>
            <td><img class="team-logo" src="${team.logo}" /></td>
            <td>${team.name}</td>
            <td>${team.games}</td>
            <td>${team.won}</td>
            <td>${team.draw}</td>
            <td>${team.lost}</td>
            <td>${team.diff}</td>
            <td>${team.points}</td>
        `;

        return tr;
    }
}