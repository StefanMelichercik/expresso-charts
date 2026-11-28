/* ===== Site settings: edit these, then publish again ===== */
const SITE = {
  // Your seller details (shown on the legal pages and in the footer). Leave '' until ready.
  sellerName: 'SM Gastro s.r.o.', // registered company name
  sellerAddress: 'Magurská 6439/8, 974 11 Banská Bystrica, Slovakia', // registered office
  sellerIds: 'IČO: 55115951, DIČ: 2121869244, IČ DPH: SK2121869244', // company IDs (+ register entry when known)
  contactEmail: 'support@expressocharts.com', // e.g. 'support@expressocharts.com'

  // Gumroad checkout link. Leave '' to show "Coming soon".
  checkout: {
    randomizer: 'https://melichercik.gumroad.com/l/randomizer?option=7ZHUEVsldp1WPdB-KrH-_A%3D%3D&wanted=true' // Poker Randomizer, monthly subscription
  },

  // GoatCounter visitor statistics (no cookies). The code is the part before .goatcounter.com. Leave '' to turn off.
  goatcounter: ''
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

  // Visitor statistics: name the clicks we want to count, then load GoatCounter
  if (SITE.goatcounter) {
    const tag = (el, name) => el.setAttribute('data-goatcounter-click', name);
    document.querySelectorAll('[data-plan]').forEach((a) => tag(a, 'buy-' + a.dataset.plan));
    document.querySelectorAll('a[href$="PokerRandomizer.zip"]').forEach((a) => tag(a, 'download-randomizer'));
    const gc = document.createElement('script');
    gc.async = true;
    gc.src = 'https://gc.zgo.at/count.js';
    gc.dataset.goatcounter = `https://${SITE.goatcounter}.goatcounter.com/count`;
    document.head.appendChild(gc);
  }


  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // mobile menu
  const btn = document.getElementById('menu-btn');
  if (btn) btn.onclick = () => document.body.classList.toggle('menu-open');
  document.querySelectorAll('.nav a').forEach((a) => a.addEventListener('click', () => document.body.classList.remove('menu-open')));
})();
