var day = 1, hour, minute;

export function start(cb) {
    fetchTime(cb);

    if (Server.isAvailable) {
        setInterval(fetchTime, 1000);
    }
}

export function getDay() {
    return day;
}

function fetchTime(cb) {
    fetch(Server.getUrl('/api/time'))
        .then(response => response.json())
        .then(time => {
            day = time.day;
            hour = time.hour;
            minute = time.minute;

            update();
            if (cb != null) {
                cb();
            }
        })
        .catch(error => {
            console.log('Error occured during fetching time:', error);
        });
}

function time() {
    if (minute > 9) {
        return 'Day ' + day + ' - ' + hour + ':' + minute;
    } else {
        return 'Day ' + day + ' - ' + hour + ':0' + minute;
    }
}

function update() {
    document.getElementById('system-time').innerHTML = time();
}