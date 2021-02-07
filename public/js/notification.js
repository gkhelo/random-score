const Notification = {
    updateCount(count) {
        let notificationCountDiv = document.getElementById('notifications-count');

        if (count > 0) {
            notificationCountDiv.style.display = 'block';
            notificationCountDiv.innerHTML = count;
        } else {
            notificationCountDiv.style.display = 'none';
        }
    },

    show(notifications) {
        console.log(notifications);
        let contentDiv = document.getElementById('notifications-content');

        let ul = document.createElement('ul');
        notifications.forEach(notification => {
            let li = document.createElement('li');
            li.innerHTML = `
                <div class="notification">
                    <div class="team-logo-wrapper">
                        <img src="${notification.team.logo}" style="max-width:24px; max-height:24px" />
                    </div>
                    <div style="margin-left: 5px">
                        ${notification.team.name} started a match
                    </div>
                </div>
            `;
            li.addEventListener('click', () => {
                Notification.seen(notification._id);
                
                let matchDiv = document.getElementById(notification.match);
                matchDiv.classList.remove('match-animation');
                
                contentDiv.style.display = 'none';
                contentDiv.innerHTML = '';

                window.location.hash = '';
                window.location.hash = notification.match;

                matchDiv.classList.add('match-animation');
            })

            ul.appendChild(li);
        });

        contentDiv.appendChild(ul);
    },

    seen(id) {
        fetch('/api/notifications/seen/' + id, { method: 'POST'} )
            .catch(error => {
                console.log('Error occured during updating notification info:', error);
            });
    }
}