
import { getDay } from './time.js';
import { updateCount as updateNotificationsCount } from './notification.js';

export function simulate() {
    setInterval(fetchLiveMatches, 1000);
    setInterval(fetchStandings, 60000);
    setInterval(fetchNotifications, 2000);
}

function fetchLiveMatches() {
    if (MatchesFilter.getSelectedDay() == getDay()) {
        fetch('/api/matches/live')
            .then(response => response.json())
            .then(liveMatches => {
                let checkedStatuses = MatchesFilter.getCheckedStatuses();
                
                liveMatches.forEach(match => {
                    if (checkedStatuses.includes(match.status)) {
                        Match.update(match);
                    } else {
                        Match.hide(match);
                    }
                });
            })
            .catch(error => {
                console.log('Error occured during rendering matches:', error);
            });
    }
}

function fetchStandings() {
    fetch('/api/standings')
        .then(response => response.json())
        .then(leagueStandings => {
            Standings.update(leagueStandings);
        })
        .catch(error => {
            console.log('Error occured during rendering standings:', error);
        });
}

function fetchNotifications() {
    fetch('/api/notifications/count')
        .then(response => response.json())
        .then(updateNotificationsCount)
        .catch(error => console.log('Error occured during fetching notifications:', error));
}