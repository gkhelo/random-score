
function startup() {
    initializeCollapsibleComponents();
    initializeCollapsibleTournamentTables();
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