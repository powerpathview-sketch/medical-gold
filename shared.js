// Site version — bump on every deploy
const MG_VERSION = '1.6';
document.addEventListener('DOMContentLoaded', () => {
  const f = document.querySelector('footer .container');
  if (f) {
    const p = document.createElement('p');
    p.style.cssText = 'margin-top:0.3rem;opacity:0.5;font-size:0.75rem';
    p.textContent = 'v' + MG_VERSION;
    f.appendChild(p);
  }
});

// Language toggle — persists across pages
function getLang() { return localStorage.getItem('mg-lang') || 'sr'; }
function setLang(lang) {
  localStorage.setItem('mg-lang', lang);
  document.body.classList.toggle('en', lang === 'en');
  document.querySelector('.lang-btn').textContent = lang === 'en' ? 'SRB' : 'ENG';
}
function toggleLang() { setLang(getLang() === 'en' ? 'sr' : 'en'); }
document.addEventListener('DOMContentLoaded', () => setLang(getLang()));

// Mobile menu
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (!links) return;
  const open = links.classList.toggle('mobile-open');
  links.style.display = open ? 'flex' : '';
}
