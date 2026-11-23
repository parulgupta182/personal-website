// Small progressive enhancements. The site is fully readable without JavaScript.

const root = document.documentElement;

/* ---------- Theme toggle (light by default) ---------- */
const themeBtn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const syncThemeLabel = () => {
  const dark = root.dataset.theme === 'dark';
  themeBtn?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeBtn?.setAttribute('aria-pressed', String(dark));
};
syncThemeLabel();
themeBtn?.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('theme', root.dataset.theme); } catch { /* storage unavailable */ }
  syncThemeLabel();
});

/* ---------- Mobile navigation ---------- */
const navToggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const header = document.querySelector<HTMLElement>('[data-header]');
const setNav = (open: boolean) => {
  header?.classList.toggle('nav-open', open);
  navToggle?.setAttribute('aria-expanded', String(open));
  navToggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
};
navToggle?.addEventListener('click', () => setNav(!header?.classList.contains('nav-open')));
document.querySelectorAll('[data-nav-link]').forEach((a) => a.addEventListener('click', () => setNav(false)));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setNav(false); });
window.matchMedia('(min-width: 980px)').addEventListener('change', (e) => { if (e.matches) setNav(false); });

/* ---------- Header shadow on scroll ---------- */
const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Active section in nav ---------- */
const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>('[data-nav-link="section"]').forEach((a) => {
  if (a.pathname === location.pathname && a.hash) links.set(a.hash.slice(1), a);
});
const sections = [...links.keys()].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
if ('IntersectionObserver' in window && sections.length) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => a.removeAttribute('aria-current'));
      links.get(en.target.id)?.setAttribute('aria-current', 'true');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => io.observe(s));
}

/* ---------- Gentle reveal on scroll ---------- */
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll<HTMLElement>('.reveal');
if (!reduce && 'IntersectionObserver' in window) {
  root.classList.add('reveal-ready');
  const ro = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-visible'); ro.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
  revealEls.forEach((el) => ro.observe(el));
}

/* ---------- Publication filters ---------- */
const filterWrap = document.querySelector('[data-filters]');
filterWrap?.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-filter]');
  if (!btn) return;
  const f = btn.dataset.filter;
  filterWrap.querySelectorAll<HTMLButtonElement>('[data-filter]').forEach((b) => {
    const on = b === btn;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.querySelectorAll<HTMLElement>('[data-pubs] > li').forEach((li) => {
    li.hidden = f !== 'all' && li.dataset.type !== f;
  });
});

/* ---------- Copy BibTeX ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = document.getElementById(btn.dataset.copy!)?.textContent ?? '';
    const label = btn.querySelector('span');
    try {
      await navigator.clipboard.writeText(text);
      if (label) label.textContent = 'Copied';
    } catch {
      if (label) label.textContent = 'Select & copy';
    }
    setTimeout(() => { if (label) label.textContent = 'Copy'; }, 1800);
  });
});

/* ---------- Spam-safe email: decode only when a visitor asks ---------- */
document.querySelectorAll<HTMLButtonElement>('[data-email]').forEach((btn) => {
  btn.addEventListener('click', () => {
    let addr = '';
    try { addr = [...atob(btn.dataset.email!)].reverse().join(''); } catch { return; }
    const a = document.createElement('a');
    a.href = `mailto:${addr}`;
    if (btn.dataset.emailStyle === 'channel') {
      a.className = 'channel';
      a.innerHTML = btn.innerHTML;
      const v = a.querySelector('.channel__value');
      if (v) v.textContent = addr;
    } else {
      a.className = btn.className;
      a.innerHTML = btn.innerHTML;
      const label = a.querySelector('span');
      if (label) label.textContent = addr;
    }
    btn.replaceWith(a);
    a.focus();
  });
});
