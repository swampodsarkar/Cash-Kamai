// ========== FIREBASE (from firebase-config.js) ==========

const ADMIN_EMAIL = 'mdswampodsarkar@gmail.com';
const ADMIN_PASS = '123456';
const USD_TO_BDT = 100; // $1 = 100 BDT (withdrawal rate)
let SITE_CONFIG = {
  freeRate: 0.01,
  premiumRate: 0.02,
  vipRate: 0.05,
  dailyLimit: 10,
  premiumDailyLimit: 50,
  vipDailyLimit: 999999,
  minWithdraw: 0.50,
  withdrawFee: 0.05,
  adDuration: 15,
  referralBonus: 0.005
};

// ========== UTILITY ==========
function $(id) { return document.getElementById(id); }
function showMsg(el, msg) { el.textContent = msg; el.style.display = 'block'; setTimeout(() => el.style.display = 'none', 4000); }
function hideMsg(el) { el.style.display = 'none'; }

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
  db.ref('stats/global').on('value', (snap) => {
    if (snap.exists()) {
      const d = snap.val();
      if ($('totalUsers')) $('totalUsers').textContent = d.totalUsers || 0;
      if ($('totalPaid')) $('totalPaid').textContent = fmt$(d.totalPaid || 0);
      if ($('totalAds')) $('totalAds').textContent = d.totalAds || 0;
    }
  });
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
        await auth.signInWithEmailAndPassword(email, password);
        window.location.href = 'dashboard.html';
      } else {
        const fullName = $('fullName').value.trim();
        const mobile = $('mobile').value.trim();
        if (!fullName) { showMsg(errorEl, 'Please enter your name'); $('authBtn').disabled = false; $('authBtn').textContent = 'Register'; return; }
        if (!mobile) { showMsg(errorEl, 'Please enter mobile number'); $('authBtn').disabled = false; $('authBtn').textContent = 'Register'; return; }

        const referralEmail = $('referral').value.trim();

        const cred = await auth.createUserWithEmailAndPassword(email, password);
        const user = cred.user;

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

        window.location.href = 'dashboard.html';
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
      window.location.href = 'dashboard.html';
    }
  });
}

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
        '<div class="ad-icon">📢</div>' +
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
        const rewardEmoji = watchCount >= 5 ? '🏆' : '✅';
        placeholder.innerHTML =
          '<div class="ad-icon">' + rewardEmoji + '</div>' +
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
        container.innerHTML = items.map(w =>
          '<div class="tx-item"><div class="tx-info"><span class="tx-type">' + (w.method || '').toUpperCase() + ' - ' + w.mobile + '</span><span class="tx-date">' + formatDate(w.createdAt) + '</span></div><div><span class="tx-amount negative">-' + fmt$(w.amount || 0) + '</span><span class="status-' + (w.status || 'pending') + '">' + (statusMap[w.status] || w.status) + '</span></div></div>'
        ).join('');
      }
    }
  });
}

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
  });

  // === PENDING WITHDRAWALS ===
  async function loadPendingWithdrawals() {
    const snap = await db.ref('withdrawals')
      .orderByChild('status').equalTo('pending').once('value');

    const container = $('pendingWithdrawals');
    if (!container) return;
    if ($('adminPendingWithdraw')) $('adminPendingWithdraw').textContent = snap.exists() ? snap.numChildren() : 0;

    if (!snap.exists()) {
      container.innerHTML = '<p class="no-data">No pending withdrawals ✅</p>';
    } else {
      let html = '';
      snap.forEach((child) => {
        const w = child.val();
        const bdtAmt = ((w.amount || 0) * USD_TO_BDT).toFixed(0);
        html += '<div class="withdraw-request"><div><strong>' + w.userEmail + '</strong><br><small>' + (w.method || '').toUpperCase() + ' - ' + w.mobile + '</small><br><small>' + formatDate(w.createdAt) + ' | ≈ ৳' + bdtAmt + '</small></div><div><strong>' + fmt$(w.amount || 0) + '</strong><button onclick="approveWithdraw(\'' + child.key + '\',\'' + w.userId + '\',' + (w.amount || 0) + ')" class="btn btn-primary" style="margin-left:10px;padding:6px 12px;font-size:12px;">✅ Approve</button><button onclick="rejectWithdraw(\'' + child.key + '\',\'' + w.userId + '\',' + (w.amount || 0) + ')" class="btn btn-outline" style="margin-left:5px;padding:6px 12px;font-size:12px;">❌ Reject</button></div></div>';
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
      '<div><strong>' + (u.fullName || 'No name') + '</strong> ' + (u.banned ? '🚫' : '') + '<br>' +
      '<small>' + u.email + ' | ' + (u.mobile || 'N/A') + ' | ' + getMembershipLabel(u.membership) + ' | Ref: ' + (u.referralCount || 0) + '</small></div>' +
      '<div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">' +
      '<span>' + fmt$(u.balance || 0) + '</span>' +
      '<button onclick="toggleBanUser(\'' + key + '\',' + (!u.banned).toString() + ')" class="btn btn-outline" style="padding:4px 10px;font-size:11px;">' + (u.banned ? '✅ Unban' : '🚫 Ban') + '</button>' +
      '<button onclick="toggleAdmin(\'' + key + '\',' + (!u.isAdmin).toString() + ')" class="btn btn-outline" style="padding:4px 10px;font-size:11px;">' + (u.isAdmin ? '👑 Demote' : '⭐ Admin') + '</button>' +
      '</div></div>'
    ).join('');
  }

  window.searchUsers = function() { loadAllUsers(); };
}

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
    alert(ban ? 'User banned! 🚫' : 'User unbanned! ✅');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function toggleAdmin(userId, makeAdmin) {
  try {
    await db.ref('users/' + userId).update({ isAdmin: makeAdmin });
    alert(makeAdmin ? 'Made admin! ⭐' : 'Admin removed!');
    location.reload();
  } catch (err) { alert('Error: ' + err.message); }
}

async function saveSettings() {
  const data = {
    freeRate: parseFloat($('settingFreeRate').value) || 0.01,
    premiumRate: parseFloat($('settingPremiumRate').value) || 0.02,
    dailyLimit: parseInt($('settingDailyLimit').value) || 10,
    minWithdraw: parseInt($('settingMinWithdraw').value) || 0.50,
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
    alert('Referral link copied! 📋');
  }
}
