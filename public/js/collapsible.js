class Collapsible {
    constructor(title, background, color) {
        this.title = title;
        this.background = background;
        this.color = color;
    }

    create() {
        let collapsible = this.createCollapsible();
        let title = this.createTitle();
        let button = this.createButton(collapsible);

        collapsible.appendChild(title);
        collapsible.appendChild(button);

        return collapsible;
    }

    // helper methods
    createCollapsible() {
        let collapsible = document.createElement('div');
        collapsible.className = 'collapsible';
        collapsible.style.background = this.background;

        return collapsible;
    }

    createTitle() {
        let title = document.createElement('div');
        title.className = 'collapsible-title';
        title.innerText = this.title;
        title.style.color = this.color;

        return title;
    }

    createButton(collapsible) {
        let button = document.createElement('div');
        button.className = 'collapsible-button';
        
        let img = this.createImage(collapsible);
        button.appendChild(img);

        return button;
    }

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