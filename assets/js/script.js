const elements = {
    homeIcon: document.getElementById('home-icon'),
    menuIcon: document.getElementById('menu-icon'),
    cancelIcon: document.getElementById('cancel-icon'),
    themeIcon: document.getElementById('theme-icon'),
    title: document.querySelector('h1'),
    arrow: document.getElementById('arrow'),
    mailIcon: document.getElementById('mail-icon'),
    githubIcon: document.getElementById('github-icon')
};

function getThemeToSet() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function setTheme(theme, elements) {
    const mode = `${theme}-mode`;
    document.body.className = mode;
    elements.homeIcon.src = `assets/img/home-${mode}.png`;
    elements.themeIcon.src = `assets/img/${theme === 'dark' ? 'sun' : 'moon'}.png`;
    elements.menuIcon.src = `assets/img/menu-${mode}.png`;
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getThemeToSet(), elements);

    elements.themeIcon.addEventListener('click', () => {
        const newTheme = document.body.className === 'dark-mode' ? 'light' : 'dark';
        setTheme(newTheme, elements);
    });
});

window.addEventListener('scroll', () => {
    elements.arrow.style.opacity = window.pageYOffset > window.innerHeight * 0.16 ? '0' : '1';
});

elements.homeIcon.addEventListener('click', () => window.location.href = 'index.html#hero');
elements.githubIcon.addEventListener('click', (event) => {
    event.preventDefault();
    const win = window.open('https://github.com/ZurekMartin', '_blank');
    win.focus();
    win.opener = null;
});

function toggleArrow(isMenuShown) {
    elements.arrow.classList.remove('arrow', 'arrow-down', 'arrow-up');
    elements.arrow.classList.add(isMenuShown ? 'arrow-down' : 'arrow-up');
    if (!isMenuShown) {
        setTimeout(function () {
            elements.arrow.classList.remove('arrow-up');
            elements.arrow.classList.add('arrow');
        }, 480);
    }
}

function toggleDisplay(element, state) {
    document.querySelector(element).style.display = state;
}

function toggleScrolling() {
    document.body.classList.toggle('no-scroll');
}

function closeMenuOnClickOutside(event) {
    var isClickInsideMenu = document.querySelector('#nav-menu').contains(event.target);
    var isClickOnMenuIcon = document.querySelector('#menu-icon').contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon) {
        toggleMenu();
        toggleArrow();
    }
}

function toggleClass(element, class1, class2) {
    element.classList.remove(class1, class2);
    element.classList.add(element.classList.contains(class1) ? class2 : class1);
}

function toggleMenu() {
    const menuShown = document.querySelector('#nav-menu').classList.toggle('menu-shown');
    toggleDisplay('#theme-icon', "none");
    toggleDisplay('#menu-icon', menuShown ? "none" : "block");
    toggleDisplay('#cancel-icon', menuShown ? "block" : "none");
    toggleScrolling();
    elements.homeIcon.classList.remove(menuShown ? 'blur-out' : 'blur-in');
    elements.homeIcon.classList.add(menuShown ? 'blur-in' : 'blur-out');
    elements.title.classList.remove(menuShown ? 'blur-out' : 'blur-in');
    elements.title.classList.add(menuShown ? 'blur-in' : 'blur-out');
    document.removeEventListener('click', closeMenuOnClickOutside);
    toggleArrow(menuShown);
    return menuShown;
}

elements.menuIcon.addEventListener('click', function () {
    const isMenuShown = toggleMenu();
    document.addEventListener('click', closeMenuOnClickOutside);
});

elements.cancelIcon.addEventListener('click', function () {
    const isMenuShown = toggleMenu();
});
