
function startup() {
    render();
    initialize();

    Simulator.start();
}

function render() {
    Render.matches();
    Render.standings();
}

function initialize() {
    initializeMenuButtons();
}

function initializeMenuButtons() {
    initializeMenuButton('search-menu', new SearchBarPopup());
    initializeMenuButton('best-teams-menu', new TeamsPopup());
    initializeMenuButton('best-leagues-menu', new TournamentsPopup());
}

function initializeMenuButton(menuId, popup) {
    let button = document.getElementById(menuId).children[0];
    button.addEventListener('click', () => popup.show());
}