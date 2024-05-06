function toggleMenu(page) {
    if (page.className.includes('active')) {
        return;
    }
    else {
        let menuItems = document.getElementsByClassName('menu-item')
        for (let menuItem of menuItems) {
            if (menuItem.className.includes('active')) {
                menuItem.classList.toggle('active')
                document.getElementById(menuItem.textContent.toLowerCase()).style.display = 'none';
            }
        }
        page.classList.toggle('active');
        document.getElementById(page.textContent.toLowerCase()).style.display = 'block';
    }
}

let contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    toggleMenu(document.getElementsByClassName('menu-item')[0])
    alert('Formulario enviado, gracias por su colaboracion!!')

})