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
