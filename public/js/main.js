
function startup() {
    renderLeagueMatches();

    initializeMenuButtons();

    initializeCollapsibleComponents();
    initializeCollapsibleTournamentTables();
}

function renderLeagueMatches() {
    let allLeagueMatches = fetchAllLeagueMatches();
    
    // let allMatchesDiv = document.getElementById('matches');
    // allLeagueMatches.forEach(leagueMatches => {
    //     allMatchesDiv.appendChild(LeagueMatches.create(leagueMatches));
    // });
}

function fetchAllLeagueMatches() {
    fetch('/api/league_matches').then(res => res.json()).then(allLeagueMatches => {
        // allLeagueMatches.forEach(leagueMatches => {
        //     console.log('id:', leagueMatches.id);
        //     console.log('name:', leagueMatches.name)

        //     leagueMatches.matches.forEach(match => {
        //         console.log('homeName', match.homeName);
        //         console.log('homeLogo', match.homeLogo);
        //         console.log('homeScore', match.homeScore);
        //         console.log('guestName', match.guestName);
        //         console.log('guestLogo', match.guestLogo);
        //         console.log('guestScore', match.guestScore);
        //     })
        // });

        let allMatchesDiv = document.getElementById('matches');
        console.log(allLeagueMatches);
        allLeagueMatches.forEach(leagueMatches => {
            allMatchesDiv.appendChild(LeagueMatches.create(leagueMatches));
        });

        // return allLeagueMatches;
    }).catch(function(error) {
        console.log('fetch error: ', error);
        return [];
    });
}

function initializeMenuButtons() {
    initializeMenuButton('search-menu', new SearchBarPopup());
    initializeMenuButton('best-teams-menu', new TeamsPopup());
    initializeMenuButton('best-tournaments-menu', new TournamentsPopup());
}

function initializeMenuButton(menuId, popup) {
    let button = document.getElementById(menuId).children[0];
    button.addEventListener('click', () => popup.show());
}

// TODO: this function will be deleted in future
function initializeCollapsibleComponents() {
    let collapsibles = document.getElementsByClassName('collapsible');
    
    Array.prototype.forEach.call(collapsibles, c => {
        let target = c.nextElementSibling;
        let img = c.children[1].children[0];

        img.addEventListener('click', function() {
            if (target.style.display !== 'none') {
                target.style.display = 'none';
                img.src = './images/slide-down.png';
            } else {
                target.style.display = 'block';
                img.src = './images/slide-up.png';
            }
        });
    });
}

function initializeCollapsibleTournamentTables() {
    let collapsibleTables = document.getElementsByClassName('collapsible-tournament-table');

    Array.prototype.forEach.call(collapsibleTables, c => {
        let target = c.nextElementSibling;

        c.addEventListener('click', function() {
            let expanded = c.getAttribute('aria-expanded') === 'true';

            c.setAttribute('aria-expanded', !expanded);
            target.hidden = expanded;
        });
    });
}