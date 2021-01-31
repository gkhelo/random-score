const Initializer = {
    search() {
        let img = document.getElementById('search-button');
        img.addEventListener('click', () => {
            let input = document.getElementById('search-input');
            input.classList.remove('search-error');

            let name = input.value;
            Team.fetchTeamInfoByName(name, info => {
                if (info.status == 'ok') {
                    Popup.show('Team Info', TeamPopup.content(info));
                } else {
                    input.classList.add('search-error');
                }
            });
        });
    }
}