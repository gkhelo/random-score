
import { show as showNotifications } from './notification.js';

export function initialize() {
    search();
    notification();
}

function search() {
    let img = document.getElementById('search-button');
    img.addEventListener('click', () => {
        let input = document.getElementById('search-input');
        input.classList.remove('search-error');

        let name = input.value;
        if (name.length > 0) {
            Team.fetchTeamInfoByName(name, info => {
                if (info.status == 'ok') {
                    Popup.show('Team Info', TeamPopup.content(info));
                } else {
                    input.classList.add('search-error');
                }
            });
        } else {
            input.classList.add('search-error');
        }
    });
}

function notification() {
    let button = document.getElementById('notifications-button');
    button.addEventListener('click', () => {
        let contentDiv = document.getElementById('notifications-content');
        
        if (contentDiv.style.display == 'block') {
            contentDiv.style.display = 'none';
            contentDiv.innerHTML = '';
        } else {
            contentDiv.style.display = 'block';
            fetch('/api/notifications/')
                .then(response => response.json())
                .then(showNotifications)
                .catch(error => console.log('Error occured during fetching notifications:', error));
        }
    });
}