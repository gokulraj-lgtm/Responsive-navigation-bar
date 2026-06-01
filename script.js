const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
const overlay = document.querySelector('.menu-overlay');
const pageSections = document.querySelectorAll('main section[id]');

const closeMenu = () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('active');
    overlay.hidden = true;
};

const openMenu = () => {
    navMenu.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    overlay.classList.add('active');
    overlay.hidden = false;
};

navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle;

const applyTheme = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('preferredTheme', theme);
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
};

const savedTheme = localStorage.getItem('preferredTheme');
const initialTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
applyTheme(initialTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
            closeMenu();
        }
    });
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && navMenu.classList.contains('open')) {
        closeMenu();
    }
});

const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const targetId = entry.target.getAttribute('id');
        const link = document.querySelector(`.nav-menu a[href="#${targetId}"]`);

        if (link) {
            link.classList.toggle('active', entry.isIntersecting);
        }
    });
}, {
    rootMargin: '-40% 0% -55% 0%',
    threshold: 0.15,
});

pageSections.forEach(section => sectionObserver.observe(section));
