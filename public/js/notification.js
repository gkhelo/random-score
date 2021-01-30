const Notification = {
    updateCount(count) {
        let notificationCountDiv = document.getElementById('notifications-count');

        if (count > 0) {
            notificationCountDiv.style.display = 'block';
            notificationCountDiv.innerHTML = count;
        } else {
            notificationCountDiv.style.display = 'none';
        }
    }
}