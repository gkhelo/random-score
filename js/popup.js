class Popup {
    constructor(title) {
        this.title = title;
    }

    show() {
        let wrapper = document.createElement('div');
        wrapper.id = 'popup-wrapper';

        let popup = document.createElement('div');
        popup.className = 'popup';
        
        popup.appendChild(this.createHeader());
        popup.appendChild(this.createContent());
        
        wrapper.appendChild(popup);
        document.body.appendChild(wrapper);
    }

    createHeader() {
        let header = document.createElement('div');
        header.className = 'popup-header';
    
        let titleDiv = document.createElement('div');
        titleDiv.className = 'popup-title';
        titleDiv.innerText = this.title;

        let closeDiv = document.createElement('div');
        closeDiv.className = 'popup-close';
        closeDiv.appendChild(this.createCloseImage());

        header.appendChild(titleDiv);
        header.appendChild(closeDiv);

        return header;
    }

    // Override this method !!! 
    createContent() {
        let emptyDiv = document.createElement('div');
        emptyDiv.style.display = 'none';
        return emptyDiv;
    }

    createCloseImage() {
        let img = document.createElement('img');
        
        img.src = './images/close.png';
        img.addEventListener('click', () => {
            document.body.removeChild(document.getElementById('popup-wrapper'));
        });
        
        return img;
    }
}

class SearchBarPopup extends Popup {
    constructor() {
        super('Search Bar');
    }

    createContent() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Search Bar Content</p>';
        return content;
    }
}

class TeamsPopup extends Popup {
    constructor() {
        super('Best Teams');
    }

    createContent() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Teams Content</p>';
        return content;
    }
}

class TournamentsPopup extends Popup {
    constructor() {
        super('Best Tournaments');
    }

    createContent() {
        let content = document.createElement('div');
        content.innerHTML = '<p style="padding-left: 15px">Best Tournaments Content</p>';
        return content;
    }
}