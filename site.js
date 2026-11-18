/* ===== Site settings: edit these, then publish again ===== */
const SITE = {
  // Your seller details (shown on the legal pages and in the footer). Leave '' until ready.
  sellerName: 'SM Gastro s.r.o.', // registered company name
  sellerAddress: 'Magurská 6439/8, 974 11 Banská Bystrica, Slovakia', // registered office
  sellerIds: 'IČO: 55115951, DIČ: 2121869244, IČ DPH: SK2121869244', // company IDs (+ register entry when known)
  contactEmail: 'support@expressocharts.com', // e.g. 'support@expressocharts.com'

  // Gumroad checkout links (one per membership tier). Leave '' to show "Coming soon".
  checkout: {
    basic: 'https://melichercik.gumroad.com/l/expresso-charts?option=-xQHzdQeok4ny23HV_OYnQ%3D%3D&wanted=true',
    pro: 'https://melichercik.gumroad.com/l/expresso-charts?option=tPQPKNJOib_V41Diph4VHA%3D%3D&wanted=true',
    unlimited: 'https://melichercik.gumroad.com/l/expresso-charts?option=lsUTc-L0LYaH27MXR_W6vQ%3D%3D&wanted=true',
    randomizer: 'https://melichercik.gumroad.com/l/poker-randomizer?wanted=true' // Poker Randomizer, one-time
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
      a.classList.add('gumroad-button'); // opens Gumroad's checkout over the page
    } else {
      a.removeAttribute('href');
      a.classList.add('disabled');
      a.textContent = L('Coming soon', 'Bientôt disponible');
      a.setAttribute('aria-disabled', 'true');
    }
  });
  if (anyCheckout) {
    const s = document.createElement('script');
    s.src = 'https://gumroad.com/js/gumroad.js';
    s.defer = true;
    document.head.appendChild(s);
  }

  // "Request a school offer": shows the address with Copy / Gmail / email app options
  // (a plain mailto: link does nothing on PCs without a desktop email app)
  document.querySelectorAll('[data-school]').forEach((a) => {
    if (!SITE.contactEmail) {
      a.removeAttribute('href');
      a.classList.add('disabled');
      a.textContent = L('Offers coming soon', 'Offres bientôt disponibles');
      return;
    }
    const subject = L('School offer: Expresso Charts', 'Offre école : Expresso Charts');
    const body = L('School / team name:\nNumber of seats:\nMonthly or yearly billing:\n', 'Nom de l’école ou de l’équipe :\nNombre de places :\nFacturation mensuelle ou annuelle :\n');
    const mail = SITE.contactEmail;
    const q = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    a.href = `mailto:${mail}?${q}`;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const d = document.createElement('div');
      d.className = 'contact-dlg';
      d.innerHTML = `<div class="card" role="dialog" aria-modal="true">
        <button class="x" aria-label="${L('Close', 'Fermer')}">×</button>
        <h3>${L('Request a school offer', 'Demander une offre école')}</h3>
        <p>${L('Email us with your school or team name, the number of seats and monthly or yearly billing:', 'Écrivez-nous avec le nom de votre école ou équipe, le nombre de places et la facturation souhaitée (mensuelle ou annuelle) :')}</p>
        <div class="addr"><span>${mail}</span><button class="btn small" data-copy>${L('Copy', 'Copier')}</button></div>
        <div class="row">
          <a class="btn primary small" target="_blank" rel="noopener" href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(mail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">${L('Open in Gmail', 'Ouvrir dans Gmail')}</a>
          <a class="btn small" href="mailto:${mail}?${q}">${L('Open email app', 'Ouvrir l’app e-mail')}</a>
        </div></div>`;
      const close = () => d.remove();
      d.addEventListener('click', (ev) => { if (ev.target === d) close(); });
      d.querySelector('.x').onclick = close;
      document.addEventListener('keydown', function esc(ev) { if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
      const cb = d.querySelector('[data-copy]');
      cb.onclick = () => {
        const done = () => { cb.textContent = L('Copied', 'Copié'); };
        if (navigator.clipboard) navigator.clipboard.writeText(mail).then(done, () => {});
      };
      document.body.appendChild(d);
    });
  });

  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu
  const btn = document.getElementById('menu-btn');
  if (btn) btn.onclick = () => document.body.classList.toggle('menu-open');
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
})();
