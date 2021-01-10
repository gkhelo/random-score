var day = 1, hour, minute;

const Time = {
    fetchTime() {
        fetch('/api/time')
            .then(response => response.json())
            .then(time => {
                day = time.day;
                hour = time.hour;
                minute = time.minute;
            })
            .catch(error => {
                console.log('Error occured during fetching time:', error);
            });
    },

    start() {
        setInterval(this.fetchTime, 1000);
    },

    day() {
        return day;
    },

    hour() {
        return hour;
    },

    minute() {
        return minute;
    },

    time() {
        if (minute > 9) {
            return 'Day ' + day + ' ' + hour + ':' + minute;
        } else {
            return 'Day ' + day + ' ' + hour + ':0' + minute;
        }
    }
}