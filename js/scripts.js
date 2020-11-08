(function() {
    let collapsibles = document.getElementsByClassName('collapsible');
    
    Array.prototype.forEach.call(collapsibles, c => {
        let target = c.nextElementSibling;

        c.onclick = () => {
            let expanded = c.getAttribute('aria-expanded') === 'true';
            
            c.setAttribute('aria-expanded', !expanded);
            target.hidden = expanded;
        }
    });
})()