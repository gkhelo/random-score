exports.number = function(from, to) {
    return from + Math.floor(Math.random() * (to - from + 1));
}

exports.pair = function(from, to, used) {
    let a, b;

    while (true) {
        let num = this.number(from, to);
        if (used.indexOf(num) == -1) {
            a = num;
            break;
        }
    }

    while (true) {
        let num = this.number(from, to);
        if (a != num && used.indexOf(num) == -1) {
            b = num;
            break;
        }
    }

    return [a, b];
}

exports.time = function() {
    let time = this.number(15, 21);
    return time.toString().concat(':00');
}

exports.goal = function() {
    let num = this.number(0, 40);
    if (num == 0) {
        return 'H'; // home
    } else if (num == 1) {
        return 'G'; // guest
    } else {
        return 'N'; // none
    }
}