const elements = {
    homeIcon: document.getElementById('home-icon'),
    themeIcon: document.getElementById('theme-icon'),
    arrow: document.querySelector('.arrow'),
    navLinks: document.querySelectorAll('.nav-right ul li a')
};

function getThemeToSet() {
    return localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

function setTheme(theme, elements) {
    const mode = `${theme}-mode`;
    document.body.className = mode;
    elements.homeIcon.src = `assets/img/home-${mode}.png`;
    elements.themeIcon.src = `assets/img/${theme === 'dark' ? 'sun' : 'moon'}.png`;
    localStorage.setItem('theme', theme);
}

document.addEventListener('DOMContentLoaded', () => {
    setTheme(getThemeToSet(), elements);

    elements.themeIcon.addEventListener('click', () => {
        const newTheme = document.body.className === 'dark-mode' ? 'light' : 'dark';
        setTheme(newTheme, elements);
    });

    const navLinks = document.querySelectorAll('.nav ul li a');
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach((navLink) => {
        if (navLink.getAttribute('href') === currentPage) {
            navLink.classList.add('active');
        }
    });
});

window.addEventListener('scroll', () => {
    elements.arrow.style.opacity = window.pageYOffset > window.innerHeight * 0.128 ? '0' : '1';
});

elements.homeIcon.addEventListener('click', () => window.location.href = 'index.html#hero');
document.getElementById('mail-icon').addEventListener('click', () => window.location.href = 'mailto:04sluky-tanky@icloud.com');
document.getElementById('github-icon').addEventListener('click', (event) => {
    event.preventDefault();
    const win = window.open('https://github.com/ZurekMartin', '_blank');
    win.focus();
    win.opener = null;
});
