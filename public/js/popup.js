const Popup = {
    show(title, content) {
        let wrapper = document.createElement('div');
        wrapper.id = 'popup-wrapper';

        let popup = document.createElement('div');
        popup.className = 'popup';
        
        popup.appendChild(this.createHeader(title));
        popup.appendChild(content);
        
        wrapper.appendChild(popup);
        document.body.appendChild(wrapper);
    },

    createHeader(title) {
        let header = document.createElement('div');
        header.className = 'popup-header';
    
        let titleDiv = document.createElement('div');
        titleDiv.className = 'popup-title';
        titleDiv.innerText = title;

        let closeDiv = document.createElement('div');
        closeDiv.className = 'popup-close';
        closeDiv.appendChild(this.createCloseImage());

        header.appendChild(titleDiv);
        header.appendChild(closeDiv);

        return header;
    },

    createCloseImage() {
        let img = document.createElement('img');
        
        img.src = './images/close.png';
        img.addEventListener('click', () => {
            document.body.removeChild(document.getElementById('popup-wrapper'));
        });
        
        return img;
    }
}

const SearchBarPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Search Bar Content</p>';
        return content;
    }
}

const BestTeamsPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Teams Content</p>';
        return content;
    }
}

const BestLeaguesPopup = {
    content() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Leagues Content</p>';
        return content;
    }
}

const TeamPopup = {
    content(info) {
        let content = document.createElement('div');
        if (info.status != 'ok') {
            content.innerHTML = `
                <p style="padding-left: 15px">Error occurred during fetching team info</p>
            `;
        } else {
            content.innerHTML = `
                <p style="padding-left: 15px">${info.team.name}</p>
            `;
        }

        return content;
    }
}