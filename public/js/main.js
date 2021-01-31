
function startup() {
    Time.start(() => {
        render();
        initialize();

        Simulator.start();
    });
}

function render() {
    Render.matches(Time.day() || 1);
    Render.standings();
}

function initialize() {
    Initializer.search();
}