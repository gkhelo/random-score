
function startup() {
    Time.start(() => {
        render();
        // initialize();

        Simulator.start();
    });
}

function render() {
    Render.matches(Time.day() || 1);
    Render.standings();
}

// TODO: maybe delete this popups in future
function initialize() {
    initializeMenuButtons();
}

function initializeMenuButtons() {
    initializeMenuButton('search-menu', 'Search Bar', SearchBarPopup.content());
    initializeMenuButton('best-teams-menu', 'Best Teams', BestTeamsPopup.content());
    initializeMenuButton('best-leagues-menu', 'Best Leagues', BestLeaguesPopup.content());
}

function initializeMenuButton(menuId, title, content) {
    let button = document.getElementById(menuId).children[0];
    button.addEventListener('click', () => Popup.show(title, content));
}