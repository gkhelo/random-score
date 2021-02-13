
const Server = {
    isAvailable: true,

    getUrl(url) {
        return this.isAvailable ? url : '/local' + url + '.json';
    }
}

console.log('server available:', Server.isAvailable);