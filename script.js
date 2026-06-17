const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('[data-nav-links]');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const revealItems = document.querySelectorAll('.reveal');
const profilePhoto = document.querySelector('.profile-photo');

if (profilePhoto) {
  profilePhoto.addEventListener('error', () => {
    profilePhoto.classList.add('is-hidden');
  });
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.toggle('menu-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
  rootMargin: '0px 0px -80px 0px'
});

revealItems.forEach((item) => revealObserver.observe(item));

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, {
  threshold: 0.32,
  rootMargin: '-18% 0px -62% 0px'
});

sections.forEach((section) => activeObserver.observe(section));

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.body.classList.remove('menu-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});
