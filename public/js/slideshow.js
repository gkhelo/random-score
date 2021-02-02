const Slideshow = {
    create() {
        let mainDiv = document.getElementById('slideshow');

        mainDiv.appendChild(this.img());
        mainDiv.appendChild(this.prev());
        mainDiv.appendChild(this.next());
    },

    img() {
        let div = document.createElement('div');
        div.className = 'slide';

        let img = document.createElement('img');
        img.id = 'current-slide';
        img.setAttribute('cur', 1);
        img.src = './images/slides/slide1.jpg';

        div.appendChild(img);
        return div;
    },

    prev() {
        let a = document.createElement('a');
        a.className = 'prev';

        a.innerHTML = '&#10094';
        a.addEventListener('click', () => {
            console.log('prev');
            this.change(-1);
        });

        return a;
    },

    next() {
        let a = document.createElement('a');
        a.className = 'next';

        a.innerHTML = '&#10095';
        a.addEventListener('click', () => {
            console.log('next');
            this.change(1);
        });

        return a;
    },

    change(num) {
        let img = document.getElementById('current-slide');
        let cur = parseInt(img.getAttribute('cur')) + num;

        if (cur < 1) {
            cur = 3;
        }
        if (cur > 3) {
            cur = 1;
        }

        img.src = './images/slides/slide' + cur + '.jpg';
        img.setAttribute('cur', cur);
    }
}