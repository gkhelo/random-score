
function startup() {
    initializeMenuButtons();

    initializeCollapsibleComponents();
    initializeCollapsibleTournamentTables();
}

function initializeMenuButtons() {
    initializeMenuButton('search-menu', 'Search Bar');
    initializeMenuButton('best-teams-menu', 'Best Teams');
    initializeMenuButton('best-tournaments-menu', 'Best Tournaments');
}

function initializeMenuButton(menuId, title) {
    let button = document.getElementById(menuId).children[0];
    button.addEventListener('click', () => {
        showPopup(title);
    });
}

function initializeCollapsibleComponents() {
    let collapsibles = document.getElementsByClassName('component-collapsible');
    
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

function showPopup(title) {
    let wrapper = document.createElement('div');
    wrapper.id = 'popup-wrapper';

    let popup = document.createElement('div');
    popup.className = 'popup';
    
    popup.appendChild(getPopupHeader(title));

    wrapper.appendChild(popup);
    document.body.appendChild(wrapper);
}

function getPopupHeader(title) {
    let header = document.createElement('div');
    header.className = 'popup-header';
 
    let titleDiv = document.createElement('div');
    titleDiv.className = 'popup-title';
    titleDiv.innerText = title;

    let closeDiv = document.createElement('div');
    closeDiv.className = 'popup-close';
    closeDiv.appendChild(getPopupCloseImage());

    header.appendChild(titleDiv);
    header.appendChild(closeDiv);

    return header;
}

function getPopupCloseImage() {
    let img = document.createElement('img');
    img.src = './images/close.png';
    img.addEventListener('click', () => {
        document.body.removeChild(document.getElementById('popup-wrapper'));
    });
    
    return img;
}