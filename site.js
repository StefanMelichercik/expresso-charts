/* ===== Site settings: edit these, then publish again ===== */
const SITE = {
  // Your seller details (shown on the legal pages and in the footer). Leave '' until ready.
  sellerName: 'Štefan Melicherčík', // e.g. 'Stefan M.' or your registered trade name
  sellerAddress: '',       // e.g. 'City, Country' (some countries require a full address)
  contactEmail: 'support@expressocharts.com', // e.g. 'support@expressocharts.com'

  // Lemon Squeezy checkout links (Store → Products → Share). Leave '' to show "Coming soon".
  checkout: {
    basic: '',
    pro: '',
    unlimited: ''
  },

  download: 'https://github.com/StefanMelichercik/expresso-charts-releases/releases/latest'
};
/* ========================================================= */

(function () {
  const FR = document.documentElement.lang === 'fr';
  const L = (en, fr) => (FR ? fr : en);
  const pending = `<span class="todo">${L('(to be added)', '(à compléter)')}</span>`;
  document.querySelectorAll('[data-fill]').forEach((el) => {
    const v = SITE[el.dataset.fill];
    if (el.dataset.fill === 'contactEmail' && v) el.innerHTML = `<a href="mailto:${v}">${v}</a>`;
    else el.innerHTML = v ? String(v).replace(/[<>&]/g, '') : pending;
  });
  document.querySelectorAll('[data-download]').forEach((a) => { a.href = SITE.download; });

  let anyCheckout = false;
  document.querySelectorAll('[data-plan]').forEach((a) => {
    const url = SITE.checkout[a.dataset.plan];
    if (url) {
      anyCheckout = true;
      a.href = url;
      a.classList.add('lemonsqueezy-button'); // opens Lemon Squeezy's checkout over the page
    } else {
      a.removeAttribute('href');
      a.classList.add('disabled');
      a.textContent = L('Coming soon', 'Bientôt disponible');
      a.setAttribute('aria-disabled', 'true');
    }
  });
  if (anyCheckout) {
    const s = document.createElement('script');
    s.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    s.defer = true;
    document.head.appendChild(s);
  }

  // "Request a school offer": opens an email to you when a contact address is set
  document.querySelectorAll('[data-school]').forEach((a) => {
    if (SITE.contactEmail) {
      a.href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(L('School offer: Expresso Charts', 'Offre école : Expresso Charts'))}&body=${encodeURIComponent(L('School / team name:\nNumber of seats:\nMonthly or yearly billing:\n', 'Nom de l’école ou de l’équipe :\nNombre de places :\nFacturation mensuelle ou annuelle :\n'))}`;
    } else {
      a.removeAttribute('href');
      a.classList.add('disabled');
      a.textContent = L('Offers coming soon', 'Offres bientôt disponibles');
    }
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu
  const btn = document.getElementById('menu-btn');
  if (btn) btn.onclick = () => document.body.classList.toggle('menu-open');
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
})();
