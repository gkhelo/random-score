
export function create() {
    let mainDiv = document.getElementById('slideshow');

    mainDiv.appendChild(img());
    mainDiv.appendChild(prev());
    mainDiv.appendChild(next());
}

function img() {
    let div = document.createElement('div');
    div.className = 'slide';

    let img = document.createElement('img');
    img.id = 'current-slide';
    img.setAttribute('cur', 1);
    img.src = './images/slides/slide1.jpg';

    div.appendChild(img);
    return div;
}

function prev() {
    let a = document.createElement('a');
    a.className = 'prev';

    a.innerHTML = '&#10094';
    a.addEventListener('click', () => {
        change(-1);
    });

    return a;
}

function next() {
    let a = document.createElement('a');
    a.className = 'next';

    a.innerHTML = '&#10095';
    a.addEventListener('click', () => {
        change(1);
    });

    return a;
}

function change(num) {
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
