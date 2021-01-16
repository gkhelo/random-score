var day = 1, hour, minute;

const Time = {
    fetchTime(cb) {
        fetch('/api/time')
            .then(response => response.json())
            .then(time => {
                day = time.day;
                hour = time.hour;
                minute = time.minute;

                Time.update();
                if (cb != null) {
                    cb();
                }
            })
            .catch(error => {
                console.log('Error occured during fetching time:', error);
            });
    },

    start(cb) {
        this.fetchTime(cb);
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
            return 'Day ' + day + ' - ' + hour + ':' + minute;
        } else {
            return 'Day ' + day + ' - ' + hour + ':0' + minute;
        }
    },

    update() {
        document.getElementById('system-time').innerHTML = Time.time();
    }
}