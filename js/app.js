// ========== FIREBASE (from firebase-config.js) ==========

const ADMIN_EMAIL = 'mdswampodsarkar@gmail.com';
const ADMIN_PASS = '123456';
const USD_TO_BDT = 100;
let SITE_CONFIG = {
  freeRate: 0.01, premiumRate: 0.02, vipRate: 0.05,
  dailyLimit: 10, premiumDailyLimit: 50, vipDailyLimit: 999999,
  minWithdraw: 0.50, withdrawFee: 0.05, adDuration: 15, referralBonus: 0.005
};

// ========== SVG ICONS ==========
const S = {
  coin: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 12h8"/><circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.2"/></svg>',
  check: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  lock: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
  bank: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="8" width="20" height="4" rx="1"/><path d="M4 12v6M8 12v6M12 12v6M16 12v6M20 12v6M2 18h20M12 2l10 6H2z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>',
  rocket: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>',
  star: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
  crown: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>',
  fire: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  gift: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>',
  megaphone: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 2v20L2 18v-4L22 2z"/><path d="M6 14v4a2 2 0 0 0 2 2h2"/></svg>',
  fb: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>',
  tw: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
  tg: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>',
  globe: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
  yt: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>',
  ig: '<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>',
  target: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
  copy: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
  plus: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  close: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  users: '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  eye: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  clock: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  send: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
  download: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  ban: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>',
  admin: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  trash: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>',
  link: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>'
};
function ic(name, size) { return S[name].replace('width="24"', 'width="' + (size || 24) + '"').replace('height="24"', 'height="' + (size || 24) + '"'); }

// ========== UTILITY ==========
function $(id) { return document.getElementById(id); }
function showMsg(el, msg, persist) { el.innerHTML = msg; el.style.display = 'block'; if (!persist) setTimeout(() => el.style.display = 'none', 5000); }
function hideMsg(el) { el.style.display = 'none'; }
function faqToggle(btn) {
  btn.classList.toggle('active');
  const answer = btn.nextElementSibling;
  answer.classList.toggle('show');
  const iconSvg = btn.querySelector('.faq-icon svg');
  if (iconSvg) {
    const lines = iconSvg.querySelectorAll('line');
    if (lines.length >= 2) {
      lines[1].style.display = btn.classList.contains('active') ? 'none' : 'block';
    }
  }
}

function formatDate(ts) {
  if (!ts) return '';
  const d = new Date(ts);
  return d.toLocaleDateString('bn-BD', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getTodayRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const end = start + 86400000;
  return { start, end };
}

function encodeEmail(email) { return email.replace(/\./g, ',').replace(/@/g, '='); }
function getMembershipLabel(plan) {
  return { free: 'Free', premium: 'Premium', vip: 'VIP' }[plan] || 'Free';
}
function calculateRate(userData) {
  const plan = (userData.membership || 'free').toLowerCase();
  if (plan === 'vip') return SITE_CONFIG.vipRate;
  if (plan === 'premium') return SITE_CONFIG.premiumRate;
  return SITE_CONFIG.freeRate;
}
function getDailyLimit(userData) {
  const plan = (userData.membership || 'free').toLowerCase();
  if (plan === 'vip') return SITE_CONFIG.vipDailyLimit;
  if (plan === 'premium') return SITE_CONFIG.premiumDailyLimit;
  return SITE_CONFIG.dailyLimit;
}
function fmt$(n) { return '$' + (n || 0).toFixed(2); }

async function loadConfig() {
  try {
    const snap = await db.ref('config/site').once('value');
    if (snap.exists()) SITE_CONFIG = { ...SITE_CONFIG, ...snap.val() };
  } catch (e) { console.log('Config not found, using defaults'); }
}

async function getUserData(uid) {
  const snap = await db.ref('users/' + uid).once('value');
  return snap.exists() ? snap.val() : null;
}

async function addTransaction(uid, type, amount, note) {
  await db.ref('transactions').push({
    userId: uid, type, amount, note: note || '',
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

// ========== PAGE DETECTION ==========
const page = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/index';

// ========== LANDING PAGE ==========
if (page.endsWith('index') || page === '') {
  loadConfig();

  // Floating coins background
  const heroEl = document.querySelector('.hero');
  if (heroEl) {
    for (let i = 0; i < 6; i++) {
      const c = document.createElement('div');
      c.className = 'floating-coin';
      c.innerHTML = '<svg viewBox="0 0 24 24" width="' + (24 + Math.random() * 24) + '" height="' + (24 + Math.random() * 24) + '" fill="none" stroke="#f7931a" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/></svg>';
      c.style.left = (5 + Math.random() * 90) + '%';
      c.style.animationDuration = (15 + Math.random() * 20) + 's';
      c.style.animationDelay = (Math.random() * 15) + 's';
      heroEl.appendChild(c);
    }
  }
  db.ref('stats/global').on('value', (snap) => {
    if (snap.exists()) {
      const d = snap.val();
      if ($('totalUsers')) $('totalUsers').textContent = d.totalUsers || 0;
      if ($('totalPaid')) $('totalPaid').textContent = fmt$(d.totalPaid || 0);
      if ($('totalAds')) $('totalAds').textContent = d.totalAds || 0;
    }
  });

  // Countdown timer (24h from now)
  const cdEnd = Date.now() + 86400000;
  setInterval(() => {
    const el = $('countdownTimer');
    if (!el) return;
    const left = cdEnd - Date.now();
    if (left <= 0) { el.textContent = 'Expired'; return; }
    const h = Math.floor(left / 3600000);
    const m = Math.floor((left % 3600000) / 60000);
    const s = Math.floor((left % 60000) / 1000);
    el.textContent = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
  }, 1000);
}

// ========== LOGIN / REGISTER ==========
let currentAuthMode = 'login';

function switchAuthTab(mode) {
  currentAuthMode = mode;
  const title = $('authTitle');
  const subtitle = $('authSubtitle');
  const btn = $('authBtn');
  const nameField = $('nameField');
  const mobileField = $('mobileField');
  const refField = $('refField');
  const tabLogin = $('tabLogin');
  const tabRegister = $('tabRegister');

  if (mode === 'login') {
    title.textContent = 'Login';
    subtitle.textContent = 'Sign in to your account';
    btn.innerHTML = 'Login';
    if (nameField) nameField.style.display = 'none';
    if (mobileField) mobileField.style.display = 'none';
    if (refField) refField.style.display = 'none';
    if (tabLogin) tabLogin.classList.add('active');
    if (tabRegister) tabRegister.classList.remove('active');
    if ($('fullName')) $('fullName').required = false;
    if ($('mobile')) $('mobile').required = false;
  } else {
    title.textContent = 'Register';
    subtitle.textContent = 'Create free account & start earning';
    btn.innerHTML = 'Register';
    if (nameField) nameField.style.display = 'block';
    if (mobileField) mobileField.style.display = 'block';
    if (refField) refField.style.display = 'block';
    if (tabLogin) tabLogin.classList.remove('active');
    if (tabRegister) tabRegister.classList.add('active');
    if ($('fullName')) $('fullName').required = true;
    if ($('mobile')) $('mobile').required = true;
  }
}

if (page.includes('login')) {
  loadConfig();

  // Resolve referral code from URL (login.html?ref=CODE)
  const refCode = new URLSearchParams(window.location.search).get('ref');
  if (refCode && $('refField')) {
    $('refField').style.display = 'block';
    (async () => {
      try {
        const refSnap = await db.ref('users').orderByChild('referralCode').equalTo(refCode).limitToFirst(1).once('value');
        if (refSnap.exists()) {
          refSnap.forEach((child) => {
            if ($('referral')) $('referral').value = child.val().email || '';
          });
        }
      } catch (e) {}
    })();
    switchAuthTab('register');
  }

  $('authForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('email').value.trim();
    const password = $('password').value;
    const errorEl = $('errorMsg');
    hideMsg(errorEl);

    if (password.length < 6) { showMsg(errorEl, 'Password must be at least 6 characters'); return; }

    $('authBtn').disabled = true;
    $('authBtn').textContent = 'Processing...';

    try {
      if (currentAuthMode === 'login') {
        const userCred = await auth.signInWithEmailAndPassword(email, password);
        const user = userCred.user;
        await user.reload();
        if (!user.emailVerified && user.email !== ADMIN_EMAIL) {
          showMsg(errorEl, 'Email not verified! ' + ic('check', 16) + ' Please check your inbox and click the verification link.<br><button onclick="resendVerification()" style="background:none;border:1px solid var(--primary);color:var(--primary);padding:6px 16px;border-radius:6px;cursor:pointer;font-size:13px;margin-top:10px;">' + ic('send', 14) + ' Resend Verification Email</button>', true);
          window.resendVerificationEmail = user.email;
          auth.signOut();
          $('authBtn').disabled = false;
          $('authBtn').textContent = 'Login';
          return;
        }
        window.location.href = (email === ADMIN_EMAIL) ? 'admin/index.html' : 'dashboard.html';
      } else {
        const fullName = $('fullName').value.trim();
        const mobile = $('mobile').value.trim();
        if (!fullName) { showMsg(errorEl, 'Please enter your name'); $('authBtn').disabled = false; $('authBtn').textContent = 'Register'; return; }
        if (!mobile) { showMsg(errorEl, 'Please enter mobile number'); $('authBtn').disabled = false; $('authBtn').textContent = 'Register'; return; }

        const referralEmail = $('referral').value.trim();

        const cred = await auth.createUserWithEmailAndPassword(email, password);
        const user = cred.user;

        // Send verification email IMMEDIATELY after account creation
        try {
          const actionCodeSettings = {
            url: 'https://cash-kamai.vercel.app/auth-action.html?mode=verifyEmail',
            handleCodeInApp: true
          };
          await user.sendEmailVerification(actionCodeSettings);
        } catch (verErr) {
          console.error('Verification email error:', verErr);
        }

const isAdminUser = (email === ADMIN_EMAIL && password === ADMIN_PASS);

        const userData = {
          uid: user.uid, fullName, email, mobile,
          balance: 0, totalEarned: 0, totalWithdrawn: 0,
          membership: 'free', membershipExpiry: null,
          referralCode: user.uid.substring(0, 8), referredBy: '',
          referralCount: 0, todayAds: 0,
          lastAdDate: new Date().toDateString(),
          totalAdsViewed: 0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          isAdmin: isAdminUser
        };

        if (referralEmail) {
          const refSnap = await db.ref('emailIndex/' + encodeEmail(referralEmail)).once('value');
          if (refSnap.exists()) {
            const refUid = refSnap.val();
            if (refUid !== user.uid) {
              userData.referredBy = refUid;
              const bonus = SITE_CONFIG.referralBonus;
              userData.balance = bonus;
              userData.totalEarned = bonus;
              await addTransaction(user.uid, 'referral_bonus', bonus, 'Referral bonus');
              await addTransaction(refUid, 'referral_commission', bonus, 'Referral commission: ' + email);
              await db.ref('users/' + refUid).update({
                referralCount: firebase.database.ServerValue.increment(1),
                balance: firebase.database.ServerValue.increment(bonus),
                totalEarned: firebase.database.ServerValue.increment(bonus)
              });
            }
          }
        } else {
          userData.balance = 0.02;
          userData.totalEarned = 0.02;
          await addTransaction(user.uid, 'welcome_bonus', 0.02, 'Welcome bonus');
        }

        const updates = {};
        updates['users/' + user.uid] = userData;
        updates['emailIndex/' + encodeEmail(email)] = user.uid;
        await db.ref().update(updates);

        await db.ref('stats/global').update({
          totalUsers: firebase.database.ServerValue.increment(1)
        });

        // Show success & sign out (verification email already sent above)
        showMsg($('successMsg') || errorEl, 'Registration successful! ' + ic('check', 16) + ' A verification link has been sent to your email. Please verify before logging in.', true);
        auth.signOut();
        switchAuthTab('login');
      }
    } catch (err) {
      let msg = err.message;
      if (err.code === 'auth/email-already-in-use') msg = 'This email is already registered';
      else if (err.code === 'auth/user-not-found') msg = 'User not found';
      else if (err.code === 'auth/wrong-password') msg = 'Wrong password';
      else if (err.code === 'auth/invalid-email') msg = 'Invalid email';
      else if (err.code === 'auth/too-many-requests') msg = 'Too many attempts! Try again later.';
      showMsg(errorEl, msg);
    }

    $('authBtn').disabled = false;
    $('authBtn').textContent = currentAuthMode === 'login' ? 'Login' : 'Register';
  });

  auth.onAuthStateChanged((user) => {
    if (user && page.includes('login')) {
      if (user.emailVerified || user.email === ADMIN_EMAIL) {
        window.location.href = (user.email === ADMIN_EMAIL) ? 'admin/index.html' : 'dashboard.html';
      }
    }
  });
}

window.resendVerification = async function() {
  const pass = prompt('Enter your password to resend verification email:');
  if (!pass) return;
  try {
    const userCred = await auth.signInWithEmailAndPassword(window.resendVerificationEmail || '', pass);
    await userCred.user.sendEmailVerification({
      url: 'https://cash-kamai.vercel.app/auth-action.html?mode=verifyEmail',
      handleCodeInApp: true
    });
    auth.signOut();
    alert('Verification email resent! Check your inbox.');
  } catch (e) {
    alert('Error: ' + (e.code === 'auth/wrong-password' ? 'Wrong password' : e.message));
  }
};

// ========== LOGOUT ==========
document.addEventListener('click', (e) => {
  if (e.target.id === 'logoutBtn' || e.target.id === 'adminLogoutBtn') {
    auth.signOut();
    window.location.href = 'index.html';
  }
});

// ========== ADMIN LOGIN ==========
if (page.includes('admin-login')) {
  loadConfig();

  $('adminAuthForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('adminEmail').value.trim();
    const password = $('adminPassword').value;
    const errorEl = $('errorMsg');
    hideMsg(errorEl);

    if (password.length < 6) { showMsg(errorEl, 'Password must be at least 6 characters'); return; }

    $('adminAuthBtn').disabled = true;
    $('adminAuthBtn').textContent = 'Verifying...';

    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      if (err.code === 'auth/user-not-found' && email === ADMIN_EMAIL && password === ADMIN_PASS) {
        const cred = await auth.createUserWithEmailAndPassword(ADMIN_EMAIL, ADMIN_PASS);
        await db.ref('users/' + cred.user.uid).set({
          uid: cred.user.uid,
          fullName: 'Super Admin',
          email: ADMIN_EMAIL,
          mobile: '',
          balance: 0,
          totalEarned: 0,
          totalWithdrawn: 0,
          membership: 'vip',
          membershipExpiry: null,
          referralCode: cred.user.uid.substring(0, 8),
          referredBy: '',
          referralCount: 0,
          todayAds: 0,
          lastAdDate: new Date().toDateString(),
          totalAdsViewed: 0,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
          isAdmin: true,
          banned: false
        });
        await auth.signInWithEmailAndPassword(ADMIN_EMAIL, ADMIN_PASS);
      } else if (err.code === 'auth/wrong-password') {
        showMsg(errorEl, 'Wrong password');
        $('adminAuthBtn').disabled = false;
        $('adminAuthBtn').textContent = 'Admin Login';
        return;
      } else if (err.code === 'auth/too-many-requests') {
        showMsg(errorEl, 'Too many attempts! Try again later');
        $('adminAuthBtn').disabled = false;
        $('adminAuthBtn').textContent = 'Admin Login';
        return;
      } else {
        showMsg(errorEl, err.message);
        $('adminAuthBtn').disabled = false;
        $('adminAuthBtn').textContent = 'Admin Login';
        return;
      }
    }

    window.location.href = '../admin/index.html';
  });
}

// ========== DASHBOARD ==========
if (page.includes('dashboard')) {
  loadConfig();

  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = 'login.html'; return; }

    const userData = await getUserData(user.uid);
    if (!userData) return;

    // Ban check
    if (userData.banned) {
      auth.signOut();
      alert('Your account has been banned. Contact support.');
      window.location.href = 'index.html';
      return;
    }

    // Auto-admin for hardcoded credentials
    if (user.email === ADMIN_EMAIL) {
      await db.ref('users/' + user.uid).update({ isAdmin: true });
    }

    if ($('userName')) $('userName').textContent = userData.fullName || 'User';

    db.ref('users/' + user.uid).on('value', (snap) => {
      if (!snap.exists()) return;
      const d = snap.val();
      if ($('balance')) $('balance').textContent = fmt$(d.balance || 0);
      if ($('totalEarned')) $('totalEarned').textContent = fmt$(d.totalEarned || 0);
      if ($('totalWithdrawn')) $('totalWithdrawn').textContent = fmt$(d.totalWithdrawn || 0);
      if ($('totalAds')) $('totalAds').textContent = d.totalAdsViewed || 0;
      if ($('referrals')) $('referrals').textContent = d.referralCount || 0;
      if ($('userStatus')) $('userStatus').textContent = getMembershipLabel(d.membership);

      // Referral info
      if ($('referralCode')) $('referralCode').textContent = d.referralCode || '-';
      if ($('referralLink')) {
        const link = window.location.origin + window.location.pathname.replace('dashboard.html', '') + 'login.html?ref=' + d.referralCode;
        $('referralLink').value = link;
      }
      if ($('referralEarnings')) {
        const refEarn = (d.referralCount || 0) * (SITE_CONFIG.referralBonus || 0.005);
        $('referralEarnings').textContent = fmt$(refEarn);
      }

      const today = new Date().toDateString();
      const adsToday = (d.lastAdDate === today) ? (d.todayAds || 0) : 0;
      const limit = getDailyLimit(d);
      const remaining = Math.max(0, limit - adsToday);
      if ($('todayAds')) $('todayAds').textContent = adsToday;
      if ($('remainingAds')) $('remainingAds').textContent = remaining;

      const rate = calculateRate(d);
      if ($('todayEarning')) $('todayEarning').textContent = fmt$(adsToday * rate);
    });

    const txSnap = await db.ref('transactions')
      .orderByChild('userId').equalTo(user.uid).limitToLast(10).once('value');

    const txContainer = $('recentTransactions');
    if (txContainer) {
      if (!txSnap.exists()) {
        txContainer.innerHTML = '<p class="no-data">No transactions yet</p>';
      } else {
        let items = [];
        txSnap.forEach((child) => { items.push(child.val()); });
        items.reverse();
        txContainer.innerHTML = items.map(tx => {
          const amt = tx.amount || 0;
          return '<div class="tx-item"><div class="tx-info"><span class="tx-type">' + (tx.note || tx.type) + '</span><span class="tx-date">' + formatDate(tx.createdAt) + '</span></div><span class="tx-amount ' + (amt >= 0 ? 'positive' : 'negative') + '">' + (amt >= 0 ? '+' : '') + fmt$(amt) + '</span></div>';
        }).join('');
      }
    }

    // === LOAD NOTIFICATIONS ===
    const notifSnap = await db.ref('notifications').orderByChild('createdAt').limitToLast(10).once('value');
    const notifContainer = $('notificationsList');
    if (notifContainer) {
      if (!notifSnap.exists()) {
        notifContainer.innerHTML = '<p class="no-data">No announcements</p>';
      } else {
        let items = [];
        notifSnap.forEach((child) => { items.push(child.val()); });
        items.reverse();
        notifContainer.innerHTML = items.map(n =>
          '<div class="tx-item"><div class="tx-info"><span class="tx-type">' + (n.title || 'Announcement') + '</span><span class="tx-date">' + formatDate(n.createdAt) + '</span><br><span style="font-size:13px;color:var(--text-muted);">' + n.message + '</span></div></div>'
        ).join('');
      }
    }

    // === SOCIAL SHARE ===
    window.__refCode = userData.referralCode || '';
    const shareBase = window.location.origin + window.location.pathname.replace('dashboard.html', '') + 'login.html?ref=' + window.__refCode;
    const shareText = encodeURIComponent('Join Cash Kamai and earn money watching ads! Get paid via bKash/Nagad. Sign up here: ');
    const shareEncUrl = encodeURIComponent(shareBase);
    const shareUrls = {
      facebook: 'https://facebook.com/sharer/sharer.php?u=' + shareEncUrl,
      twitter: 'https://twitter.com/intent/tweet?text=' + shareText + '&url=' + shareEncUrl,
      telegram: 'https://t.me/share/url?url=' + shareEncUrl + '&text=' + shareText,
      whatsapp: 'https://wa.me/?text=' + shareText + ' ' + shareEncUrl
    };
    ['facebook','twitter','telegram','whatsapp'].forEach(p => {
      const el = $('share' + p.charAt(0).toUpperCase() + p.slice(1));
      if (el) {
        el.onclick = function(e) {
          e.preventDefault();
          window.open(shareUrls[p], '_blank', 'width=600,height=500,noopener,noreferrer');
        };
      }
    });

    // === REFERRAL LEADERBOARD ===
    const lbContainer = $('leaderboard');
    if (lbContainer) {
      const lbSnap = await db.ref('users').orderByChild('referralCount').limitToLast(10).once('value');
      if (!lbSnap.exists() || lbSnap.numChildren() === 0) {
        lbContainer.innerHTML = '<p class="no-data">No referrals yet. Be the first!</p>';
      } else {
        let lb = [];
        lbSnap.forEach((child) => { lb.push(child.val()); });
        lb.sort((a, b) => (b.referralCount || 0) - (a.referralCount || 0));
        lbContainer.innerHTML = lb.map((u, i) =>
          '<div class="leaderboard-item"><span class="leaderboard-rank">#' + (i + 1) + '</span><span class="leaderboard-name">' + (u.fullName || 'User') + '</span><span class="leaderboard-referrals">' + (u.referralCount || 0) + ' refs</span></div>'
        ).join('');
      }
    }
  });
}

// ========== EARN PAGE ==========
if (page.includes('earn')) {
  loadConfig();

  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = 'login.html'; return; }

    let isWatching = false;
    let watchTimer = null;
    let remainingTime = 0;
    let watchCount = 0;
    let adLink = '';

    // Load ad link from config
    const adLinkSnap = await db.ref('config/adLink').once('value');
    adLink = adLinkSnap.val() || 'https://google.com';

    const userData = await getUserData(user.uid);
    if (!userData) return;

    if (userData.banned) {
      auth.signOut();
      alert('Your account has been banned.');
      window.location.href = 'index.html';
      return;
    }

    if (user.email === ADMIN_EMAIL) {
      await db.ref('users/' + user.uid).update({ isAdmin: true });
    }

    const dailyLimit = getDailyLimit(userData);
    const rate = calculateRate(userData);
    const today = new Date().toDateString();
    let adsToday = (userData.lastAdDate === today) ? (userData.todayAds || 0) : 0;
    let remaining = Math.max(0, dailyLimit - adsToday);

    function updateDisplay() {
      if ($('todayAdsCount')) $('todayAdsCount').textContent = adsToday;
      if ($('remainingAdsCount')) $('remainingAdsCount').textContent = remaining;
      const pct = dailyLimit > 0 ? Math.min(100, (adsToday / dailyLimit) * 100) : 0;
      if ($('progressFill')) $('progressFill').style.width = pct + '%';
      if ($('todayEarnedAmount')) $('todayEarnedAmount').textContent = fmt$(adsToday * rate);
    }
    updateDisplay();
    loadAdHistory(user.uid);

    async function loadAdHistory(uid) {
      const range = getTodayRange();
      const snap = await db.ref('adViews')
        .orderByChild('userId').equalTo(uid).limitToLast(20).once('value');

      const container = $('adHistoryList');
      if (!container) return;
      if (!snap.exists()) {
        container.innerHTML = '<p class="no-data">No ads watched today</p>';
      } else {
        let items = [];
        snap.forEach((child) => { items.push(child.val()); });
        items.reverse();
        container.innerHTML = items.filter(a => a.viewedAt >= range.start && a.viewedAt < range.end).map(ad =>
          '<div class="tx-item"><div class="tx-info"><span class="tx-type">Ad Viewed</span><span class="tx-date">' + formatDate(ad.viewedAt) + '</span></div><span class="tx-amount positive">+' + fmt$(ad.earned || 0) + '</span></div>'
        ).join('') || '<p class="no-data">No ads watched today</p>';
      }
    }

    function startWatch(userRate) {
      if (isWatching) return;
      if (remaining <= 0) {
        alert("You've reached today's limit! Come back tomorrow.");
        return;
      }

      // Open ad link in new tab
      if (adLink) {
        window.open(adLink, '_blank');
      }

      isWatching = true;
      remainingTime = SITE_CONFIG.adDuration || 15;

      const adContainer = $('adContainer');
      if (adContainer) adContainer.classList.add('ad-active');

      const placeholder = $('adPlaceholder');
      placeholder.innerHTML =
        '<div class="ad-icon">' + ic('megaphone', 72) + '</div>' +
        '<h3>Watch Sponsored Ad</h3>' +
        '<p>Thank you for watching! Please wait ' + SITE_CONFIG.adDuration + ' seconds...</p>' +
        '<div class="ad-timer" id="adTimer">' + remainingTime + '</div>';

      watchTimer = setInterval(() => {
        remainingTime--;
        const timerEl = $('adTimer');
        if (timerEl) timerEl.textContent = remainingTime;
        if (remainingTime <= 0) {
          clearInterval(watchTimer);
          completeAdWatch(userRate);
        }
      }, 1000);
    }

    async function completeAdWatch(userRate) {
      try {
        const earned = userRate;

        await db.ref('users/' + user.uid).update({
          balance: firebase.database.ServerValue.increment(earned),
          totalEarned: firebase.database.ServerValue.increment(earned),
          todayAds: firebase.database.ServerValue.increment(1),
          totalAdsViewed: firebase.database.ServerValue.increment(1),
          lastAdDate: today
        });

        await db.ref('adViews').push({
          userId: user.uid, earned, rate: userRate,
          viewedAt: firebase.database.ServerValue.TIMESTAMP
        });

        await addTransaction(user.uid, 'ad_view', earned, 'Ad viewed');

        await db.ref('stats/global').update({
          totalAds: firebase.database.ServerValue.increment(1)
        });

        isWatching = false;
        watchCount++;

        const adContainer = $('adContainer');
        if (adContainer) adContainer.classList.remove('ad-active');

        adsToday++;
        remaining = Math.max(0, dailyLimit - adsToday);
        updateDisplay();

        const placeholder = $('adPlaceholder');
        const rewardIcon = watchCount >= 5 ? ic('trophy', 72) : ic('check', 72);
        placeholder.innerHTML =
          '<div class="ad-icon">' + rewardIcon + '</div>' +
          '<h3>You earned ' + fmt$(earned) + '!</h3>' +
          '<div class="ad-earned">+' + fmt$(earned) + '</div>' +
          '<p style="margin-top:12px;">' + remaining + ' ads remaining today</p>' +
          '<button id="watchAdBtn" class="btn btn-primary btn-large" style="margin-top:16px;">' +
          (remaining > 0 ? 'Watch Another Ad' : "That's all for today!") + '</button>';

        if (remaining > 0) {
          $('watchAdBtn').addEventListener('click', () => startWatch(userRate));
        }

        loadAdHistory(user.uid);

      } catch (err) {
        console.error('Ad watch error:', err);
        alert('Failed to record ad view. Please try again.');
        isWatching = false;
        const adContainer = $('adContainer');
        if (adContainer) adContainer.classList.remove('ad-active');
      }
    }

    if ($('watchAdBtn')) {
      $('watchAdBtn').addEventListener('click', () => startWatch(rate));
    }
  });
}

// ========== WITHDRAW PAGE ==========
if (page.includes('withdraw')) {
  loadConfig();

  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = 'login.html'; return; }

    db.ref('users/' + user.uid).on('value', (snap) => {
      if (snap.exists() && $('withdrawBalance')) {
        $('withdrawBalance').textContent = fmt$(snap.val().balance || 0);
      }
    });

    loadWithdrawHistory(user.uid);

    $('withdrawForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errorEl = $('withdrawError');
      const successEl = $('withdrawSuccess');
      hideMsg(errorEl);
      hideMsg(successEl);

      const amount = parseFloat($('withdrawAmount').value);
      const method = $('withdrawMethod').value;
      const mobile = $('withdrawMobile').value.trim();

      if (!amount || amount < SITE_CONFIG.minWithdraw) { showMsg(errorEl, 'Minimum withdrawal is $' + SITE_CONFIG.minWithdraw); return; }
      if (!method) { showMsg(errorEl, 'Please select a method'); return; }
      if (!mobile || mobile.length < 11) { showMsg(errorEl, 'Please enter a valid mobile number'); return; }

      const userData = await getUserData(user.uid);
      if (!userData) return;

      const fee = userData.membership === 'free' ? amount * SITE_CONFIG.withdrawFee : 0;
      const totalDeduct = amount + fee;

      if (userData.balance < totalDeduct) { showMsg(errorEl, 'Insufficient balance'); return; }

      $('withdrawBtn').disabled = true;
      $('withdrawBtn').textContent = 'Processing...';

      try {
        await db.ref('withdrawals').push({
          userId: user.uid, userEmail: user.email, amount, fee, method, mobile,
          status: 'pending',
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        await db.ref('users/' + user.uid).update({
          balance: firebase.database.ServerValue.increment(-totalDeduct),
          totalWithdrawn: firebase.database.ServerValue.increment(amount)
        });

        await addTransaction(user.uid, 'withdrawal', -amount, 'Withdrawal pending: ' + method);

        showMsg(successEl, 'Withdrawal request submitted! You will receive approx. ' + fmt$(amount * USD_TO_BDT) + ' BDT within 24-48 hours.');
        $('withdrawForm').reset();
        loadWithdrawHistory(user.uid);

      } catch (err) {
        showMsg(errorEl, 'Error: ' + err.message);
      }

      $('withdrawBtn').disabled = false;
      $('withdrawBtn').textContent = 'Withdraw';
    });

    async function loadWithdrawHistory(uid) {
      const snap = await db.ref('withdrawals')
        .orderByChild('userId').equalTo(uid).limitToLast(10).once('value');

      const container = $('withdrawHistory');
      if (!container) return;
      if (!snap.exists()) {
        container.innerHTML = '<p class="no-data">No withdrawals yet</p>';
      } else {
        let items = [];
        snap.forEach((child) => { items.push(child.val()); });
        items.reverse();
        const statusMap = { pending: ' Pending', approved: ' Approved', rejected: ' Rejected' };
        const wStatusIcon = { pending: ic('clock', 14), approved: ic('check', 14), rejected: ic('close', 14) };
        container.innerHTML = items.map(w =>
          '<div class="tx-item"><div class="tx-info"><span class="tx-type">' + (w.method || '').toUpperCase() + ' - ' + w.mobile + '</span><span class="tx-date">' + formatDate(w.createdAt) + '</span></div><div><span class="tx-amount negative">-' + fmt$(w.amount || 0) + '</span><span class="status-' + (w.status || 'pending') + '">' + (wStatusIcon[w.status] || '') + (statusMap[w.status] || w.status) + '</span></div></div>'
        ).join('');
      }
    }
  });
}

// ========== TASKS PAGE ==========
if (page.includes('tasks')) {
  loadConfig();

  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = 'login.html'; return; }

    const userData = await getUserData(user.uid);
    if (!userData) return;
    if (userData.banned) { auth.signOut(); window.location.href = 'index.html'; return; }

    // Load completed tasks for this user
    const completedSnap = await db.ref('userTasks/' + user.uid).once('value');
    const completed = {};
    if (completedSnap.exists()) {
      completedSnap.forEach((child) => { completed[child.key] = child.val(); });
    }

    const taskDone = Object.keys(completed).length;
    const taskEarned = (userData.taskEarnings || 0);
    if ($('tasksDone')) $('tasksDone').textContent = taskDone;
    if ($('taskEarnings')) $('taskEarnings').textContent = fmt$(taskEarned);

    // Load tasks from Firebase
    const tasksSnap = await db.ref('tasks').once('value');
    const container = $('tasksList');
    if (!container) return;

    if (!tasksSnap.exists()) {
      container.innerHTML = '<p class="no-data">No tasks available yet. Check back soon!</p>';
      return;
    }

    let html = '';
    tasksSnap.forEach((child) => {
      const t = child.val();
      const taskId = child.key;
      const done = completed[taskId];
      const taskIconMap = { globe: S.globe, fb: S.fb, yt: S.yt, tg: S.tg, ig: S.ig, tw: S.tw, download: S.download, target: S.target };
      const taskIconSvg = taskIconMap[t.icon] || S.clipboard;
      html += '<div class="ad-container" style="' + (done ? 'border-color:rgba(76,175,80,0.3);' : '') + '">' +
        '<div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;width:100%;">' +
        '<div style="font-size:48px;flex-shrink:0;color:var(--primary);">' + taskIconSvg + '</div>' +
        '<div style="flex:1;min-width:200px;text-align:left;">' +
        '<h3 style="font-size:18px;font-weight:700;margin-bottom:6px;">' + t.title + '</h3>' +
        '<p style="color:var(--text-muted);font-size:14px;margin-bottom:8px;">' + t.description + '</p>' +
        '<div style="display:inline-block;padding:4px 12px;background:rgba(76,175,80,0.15);border-radius:20px;color:#69f0ae;font-weight:700;font-size:14px;">+' + fmt$(t.reward || 0) + '</div>' +
        '</div>' +
        '<div style="flex-shrink:0;">' +
        (done
          ? '<span style="display:inline-block;padding:10px 20px;background:rgba(76,175,80,0.15);border:1px solid rgba(76,175,80,0.3);border-radius:10px;color:#69f0ae;font-weight:600;font-size:14px;">✓ Completed</span>'
          : '<button onclick="startTask(\'' + taskId + '\',\'' + t.link + '\',' + (t.reward || 0) + ')" class="btn btn-primary" style="padding:10px 24px;">Start Task</button>'
        ) +
        '</div></div></div>';
    });
    container.innerHTML = html;
  });
}

window.startTask = async function(taskId, link, reward) {
  const user = auth.currentUser;
  if (!user) return;
  if (link) window.open(link, '_blank');
  if (!confirm('Did you complete the task? Click OK to verify and earn $' + (reward || 0).toFixed(2))) return;
  try {
    await db.ref('userTasks/' + user.uid + '/' + taskId).set(firebase.database.ServerValue.TIMESTAMP);
    await db.ref('users/' + user.uid).update({
      balance: firebase.database.ServerValue.increment(reward || 0),
      totalEarned: firebase.database.ServerValue.increment(reward || 0),
      taskEarnings: firebase.database.ServerValue.increment(reward || 0)
    });
    await addTransaction(user.uid, 'task_reward', reward || 0, 'Task completed');
    alert('Congratulations! You earned ' + fmt$(reward || 0) + '!');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
};

// ========== ADMIN PANEL ==========
if (page.includes('admin') && !page.includes('admin-login')) {
  loadConfig();

  auth.onAuthStateChanged(async (user) => {
    if (!user) { window.location.href = '../admin-login.html'; return; }

    const userData = await getUserData(user.uid);
    if (!userData || !userData.isAdmin) {
      alert('Admin access required!');
      window.location.href = '../admin-login.html';
      return;
    }

    // Auto-admin for hardcoded credentials
    if (user.email === ADMIN_EMAIL) {
      await db.ref('users/' + user.uid).update({ isAdmin: true });
    }

    // === LOAD CONTENT ===
    const adminContent = $('adminContent');
    const adminLoading = $('adminLoading');
    if (adminContent) adminContent.style.display = 'block';
    if (adminLoading) adminLoading.style.display = 'none';

    // === STATS ===
    const usersSnap = await db.ref('users').once('value');
    let totalBalance = 0, totalAds = 0, newToday = 0;
    const todayStart = new Date(new Date().toDateString()).getTime();

    if (usersSnap.exists()) {
      usersSnap.forEach((child) => {
        const d = child.val();
        totalBalance += d.balance || 0;
        totalAds += d.totalAdsViewed || 0;
        if (d.createdAt && d.createdAt >= todayStart) newToday++;
      });
    }
    if ($('adminTotalUsers')) $('adminTotalUsers').textContent = usersSnap.numChildren();
    if ($('adminNewToday')) $('adminNewToday').textContent = newToday;
    if ($('adminTotalBalance')) $('adminTotalBalance').textContent = fmt$(totalBalance);

    loadPendingWithdrawals();
    loadNewUsers();
    loadAllUsers();

    // === LOAD SETTINGS ===
    const configSnap = await db.ref('config/site').once('value');
    if (configSnap.exists()) {
      const c = configSnap.val();
      if ($('settingFreeRate')) $('settingFreeRate').value = c.freeRate || 0.01;
      if ($('settingPremiumRate')) $('settingPremiumRate').value = c.premiumRate || 0.02;
      if ($('settingDailyLimit')) $('settingDailyLimit').value = c.dailyLimit || 10;
      if ($('settingMinWithdraw')) $('settingMinWithdraw').value = c.minWithdraw || 0.50;
      if ($('settingReferralBonus')) $('settingReferralBonus').value = c.referralBonus || 0.005;
    }

    // === LOAD AD LINK ===
    const adLinkSnap = await db.ref('config/adLink').once('value');
    if ($('settingAdUrl')) $('settingAdUrl').value = adLinkSnap.val() || '';

    // === LOAD NOTIFICATIONS ===
    if ($('notifList')) loadNotifList();

    // === LOAD TASKS ===
    if ($('tasksList')) loadAdminTasks();
  });

  // === PENDING WITHDRAWALS ===
  async function loadPendingWithdrawals() {
    const snap = await db.ref('withdrawals')
      .orderByChild('status').equalTo('pending').once('value');

    const container = $('pendingWithdrawals');
    if (!container) return;
    if ($('adminPendingWithdraw')) $('adminPendingWithdraw').textContent = snap.exists() ? snap.numChildren() : 0;

    if (!snap.exists()) {
      container.innerHTML = '<p class="no-data">' + ic('check', 18) + ' No pending withdrawals</p>';
    } else {
      let html = '';
      snap.forEach((child) => {
        const w = child.val();
        const bdtAmt = ((w.amount || 0) * USD_TO_BDT).toFixed(0);
        html += '<div class="withdraw-request"><div><strong>' + w.userEmail + '</strong><br><small>' + (w.method || '').toUpperCase() + ' - ' + w.mobile + '</small><br><small>' + formatDate(w.createdAt) + ' | ≈ ৳' + bdtAmt + '</small></div><div><strong>' + fmt$(w.amount || 0) + '</strong><button onclick="approveWithdraw(\'' + child.key + '\',\'' + w.userId + '\',' + (w.amount || 0) + ')" class="btn btn-primary" style="margin-left:10px;padding:6px 12px;font-size:12px;">' + ic('check', 14) + ' Approve</button><button onclick="rejectWithdraw(\'' + child.key + '\',\'' + w.userId + '\',' + (w.amount || 0) + ')" class="btn btn-outline" style="margin-left:5px;padding:6px 12px;font-size:12px;">' + ic('close', 14) + ' Reject</button></div></div>';
      });
      container.innerHTML = html;
    }
  }

  // === NEW USERS ===
  async function loadNewUsers() {
    const snap = await db.ref('users').orderByChild('createdAt').limitToLast(10).once('value');
    const container = $('newUsersList');
    if (!container) return;
    if (!snap.exists()) {
      container.innerHTML = '<p class="no-data">No users yet</p>';
    } else {
      let items = [];
      snap.forEach((child) => { items.push({ key: child.key, val: child.val() }); });
      items.reverse();
      container.innerHTML = items.map(({ key, val: u }) =>
        '<div class="user-row"><div><strong>' + (u.fullName || 'No name') + '</strong><br><small>' + u.email + ' | ' + (u.mobile || 'N/A') + ' | Joined: ' + formatDate(u.createdAt) + '</small></div></div>'
      ).join('');
    }
  }

  // === ALL USERS (with ban toggle) ===
  async function loadAllUsers(filter) {
    const snap = await db.ref('users').orderByChild('createdAt').limitToLast(100).once('value');
    const container = $('usersList');
    if (!container) return;

    let items = [];
    if (snap.exists()) {
      snap.forEach((child) => { items.push({ key: child.key, val: child.val() }); });
      items.reverse();
    }

    if (items.length === 0) {
      container.innerHTML = '<p class="no-data">No users found</p>';
      return;
    }

    // Apply search filter
    const q = ($('userSearchInput') ? $('userSearchInput').value.toLowerCase() : '');
    if (q) {
      items = items.filter(({ val: u }) =>
        (u.email || '').toLowerCase().includes(q) ||
        (u.fullName || '').toLowerCase().includes(q) ||
        (u.mobile || '').includes(q)
      );
    }

    container.innerHTML = items.map(({ key, val: u }) =>
      '<div class="user-row" style="' + (u.banned ? 'opacity:0.5;' : '') + '">' +
      '<div><strong>' + (u.fullName || 'No name') + '</strong> ' + (u.banned ? ic('ban', 16) : '') + '<br>' +
      '<small>' + u.email + ' | ' + (u.mobile || 'N/A') + ' | ' + getMembershipLabel(u.membership) + ' | Ref: ' + (u.referralCount || 0) + '</small></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">' +
      '<span>' + fmt$(u.balance || 0) + '</span>' +
      '<button onclick="toggleBanUser(\'' + key + '\',' + (!u.banned).toString() + ')" class="btn btn-outline" style="padding:4px 10px;font-size:11px;">' + (u.banned ? ic('check', 14) + ' Unban' : ic('ban', 14) + ' Ban') + '</button>' +
      '<button onclick="toggleAdmin(\'' + key + '\',' + (!u.isAdmin).toString() + ')" class="btn btn-outline" style="padding:4px 10px;font-size:11px;">' + (u.isAdmin ? ic('admin', 14) + ' Demote' : ic('star', 14) + ' Admin') + '</button>' +
      '</div></div>'
    ).join('');
  }

  window.searchUsers = function() { loadAllUsers(); };

  // === ADMIN TASKS LIST ===
  async function loadAdminTasks() {
    const snap = await db.ref('tasks').once('value');
    const container = $('tasksList');
    if (!container) return;
    if (!snap.exists()) {
      container.innerHTML = '<p class="no-data">No tasks added yet</p>';
      return;
    }
    let html = '';
    snap.forEach((child) => {
      const t = child.val();
      const adminTaskIconMap = { globe: S.globe, fb: S.fb, yt: S.yt, tg: S.tg, ig: S.ig, tw: S.tw, download: S.download, target: S.target };
      const adminTaskIcon = adminTaskIconMap[t.icon] || S.clipboard;
      html += '<div class="tx-item">' +
        '<div class="tx-info"><span class="tx-type">' + adminTaskIcon + ' ' + t.title + '</span>' +
        '<span class="tx-date">' + fmt$(t.reward || 0) + ' | ' + (t.description || '') + '</span></div>' +
        '<button onclick="deleteTask(\'' + child.key + '\')" class="btn btn-outline" style="padding:4px 10px;font-size:11px;">' + ic('trash', 16) + ' Delete</button></div>';
    });
    container.innerHTML = html;
  }

  // === NOTIFICATIONS LIST ===
  async function loadNotifList() {
    const snap = await db.ref('notifications').orderByChild('createdAt').limitToLast(20).once('value');
    const container = $('notifList');
    if (!container) return;
    if (!snap.exists()) {
      container.innerHTML = '<p class="no-data">No notifications sent yet</p>';
      return;
    }
    let items = [];
    snap.forEach((child) => { items.push({ key: child.key, val: child.val() }); });
    items.reverse();
    container.innerHTML = items.map(({ key, val: n }) =>
      '<div class="tx-item"><div class="tx-info"><span class="tx-type">' + (n.title || 'Notification') + '</span><span class="tx-date">' + formatDate(n.createdAt) + '</span><br><span style="font-size:13px;color:var(--text-muted);">' + n.message + '</span></div></div>'
    ).join('');
  }
}

window.sendNotification = async function() {
  const title = $('notifTitle').value.trim();
  const message = $('notifMessage').value.trim();
  if (!message) { alert('Please enter a message'); return; }
  try {
    await db.ref('notifications').push({
      title: title || 'Announcement',
      message,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    });
    $('notifTitle').value = '';
    $('notifMessage').value = '';
    alert('Notification sent to all users!');
    if ($('notifList')) loadNotifList();
  } catch (err) { alert('Error: ' + err.message); }
};

// ========== GLOBAL ADMIN FUNCTIONS ==========
async function approveWithdraw(withdrawId, userId, amount) {
  if (!confirm('Approve withdrawal of ' + fmt$(amount || 0) + '?')) return;
  try {
    await db.ref('withdrawals/' + withdrawId).update({ status: 'approved' });
    await addTransaction(userId, 'withdrawal_approved', 0, 'Withdrawal approved: ' + fmt$(amount || 0));
    await db.ref('stats/global').update({
      totalPaid: firebase.database.ServerValue.increment(amount || 0)
    });
    alert('Approved! User will get ৳' + ((amount || 0) * USD_TO_BDT).toFixed(0) + ' via bKash/Nagad.');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function rejectWithdraw(withdrawId, userId, amount) {
  if (!confirm('Reject this withdrawal?')) return;
  try {
    await db.ref('withdrawals/' + withdrawId).update({ status: 'rejected' });
    await db.ref('users/' + userId).update({
      balance: firebase.database.ServerValue.increment(amount || 0)
    });
    await addTransaction(userId, 'withdrawal_rejected', amount || 0, 'Withdrawal rejected, refunded');
    alert('Rejected and refunded!');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function toggleBanUser(userId, ban) {
  if (!confirm((ban ? 'Ban' : 'Unban') + ' this user?')) return;
  try {
    await db.ref('users/' + userId).update({ banned: ban });
    alert(ban ? 'User banned!' : 'User unbanned!');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function toggleAdmin(userId, makeAdmin) {
  try {
    await db.ref('users/' + userId).update({ isAdmin: makeAdmin });
    alert(makeAdmin ? 'Made admin!' : 'Admin removed!');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function saveSettings() {
  const data = {
    freeRate: parseFloat($('settingFreeRate').value) || 0.01,
    premiumRate: parseFloat($('settingPremiumRate').value) || 0.02,
    dailyLimit: parseInt($('settingDailyLimit').value) || 10,
    minWithdraw: parseFloat($('settingMinWithdraw').value) || 0.50,
    referralBonus: parseFloat($('settingReferralBonus').value) || 0.005
  };
  try {
    await db.ref('config/site').set(data);
    alert('Settings saved!');
  } catch (err) { alert('Error: ' + err.message); }
}

async function saveAdLink() {
  const url = $('settingAdUrl').value.trim();
  if (!url) { alert('Please enter a URL'); return; }
  try {
    await db.ref('config/adLink').set(url);
    alert('Ad link saved! Users will be redirected to this URL when watching ads.');
  } catch (err) { alert('Error: ' + err.message); }
}

function copyReferral() {
  const input = $('referralLink');
  if (input) {
    input.select();
    document.execCommand('copy');
    alert('Referral link copied!');
  }
}

// ========== TASK ADMIN FUNCTIONS ==========
window.addTask = async function() {
  const title = $('taskTitle').value.trim();
  const description = $('taskDesc').value.trim();
  const reward = parseFloat($('taskReward').value) || 0;
  const link = $('taskLink').value.trim();
  const icon = $('taskIcon').value;
  if (!title || !description || reward <= 0) { alert('Please fill all required fields'); return; }
  try {
    await db.ref('tasks').push({ title, description, reward, link, icon, createdAt: firebase.database.ServerValue.TIMESTAMP });
    $('taskTitle').value = ''; $('taskDesc').value = ''; $('taskLink').value = '';
    alert('Task added! Users can now complete it.');
    if ($('tasksList')) loadAdminTasks();
  } catch (err) { alert('Error: ' + err.message); }
};

window.deleteTask = async function(taskId) {
  if (!confirm('Delete this task?')) return;
  try {
    await db.ref('tasks/' + taskId).remove();
    alert('Task deleted!');
    if ($('tasksList')) loadAdminTasks();
  } catch (err) { alert('Error: ' + err.message); }
};
