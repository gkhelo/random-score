const Collapsible = {
    create(title, background, color) {
        let mainDiv = this.createMainDiv(background);
        let titleDiv = this.createTitle(title, color);
        let button = this.createButton(mainDiv);

        mainDiv.appendChild(titleDiv);
        mainDiv.appendChild(button);

        return mainDiv;
    },

    // helper methods
    createMainDiv(background) {
        let collapsible = document.createElement('div');
        collapsible.className = 'collapsible';
        collapsible.style.background = background;

        return collapsible;
    },

    createTitle(title, color) {
        let titleDiv = document.createElement('div');
        titleDiv.className = 'collapsible-title';
        titleDiv.innerText = title;
        titleDiv.style.color = color;

        return titleDiv;
    },

    createButton(collapsible) {
        let button = document.createElement('div');
        button.className = 'collapsible-button';
        
        let img = this.createImage(collapsible);
        button.appendChild(img);

        return button;
    },

    createImage(collapsible) {
        let img = document.createElement('img');
        img.src = './images/slide-up.png';
        img.addEventListener('click', () => {
            let target = collapsible.nextElementSibling;
            if (target.style.display !== 'none') {
                target.style.display = 'none';
                img.src = './images/slide-down.png';
            } else {
                target.style.display = 'block';
                img.src = './images/slide-up.png';
            }
        });

        return img;
    }
}