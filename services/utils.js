const utils = {
    randomNumber: function(from, to) {
        return from + Math.floor(Math.random() * (to + 1));
    },

    randomUniqueNumbers: function(from, to, size) {
        let result = [];
        let numTries = 0;

        while(result.length < size) {
            if (numTries > 3 * size) {
                break;
            }

            numTries++;

            let num = this.randomNumber(from, to);
            if (result.indexOf(num) == -1) {
                result.push(num);
            }
        }

        let i = from;
        while (result.length < size) {
            result.push(i);
            i++;
        }

        return result;
    },

    randomStatus: function() {
        let rand = this.randomNumber(0, 2);
        return -1 + rand;
    },

    time: function() {
        return '20:00';
    }
};

module.exports = utils;