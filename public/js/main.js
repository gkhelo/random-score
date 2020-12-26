
function startup() {
    render();
    initialize();
}

function render() {
    Render.matches();
    Render.standings();
}

function initialize() {
    initializeMenuButtons();
    initializeCollapsibleComponents();
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