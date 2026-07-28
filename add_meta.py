import os

files = {
    'index.html': {
        'title': 'Cash Kamai - Earn Money Watching Ads',
        'desc': 'Watch ads, earn dollars! Cash Kamai is the best PTC site in Bangladesh. Earn $0.01-$0.05 per ad view via bKash, Nagad, Rocket. Free to join!'
    },
    'login.html': {
        'title': 'Login / Register - Cash Kamai',
        'desc': 'Sign in or create a free account on Cash Kamai. Start earning money by watching ads daily.'
    },
    'dashboard.html': {
        'title': 'Dashboard - Cash Kamai',
        'desc': 'Your Cash Kamai dashboard. Track earnings, watch ads, withdraw earnings.'
    },
    'earn.html': {
        'title': 'Watch Ads & Earn - Cash Kamai',
        'desc': 'Watch sponsored ads and earn money. Simple, fast, and rewarding. Earn daily!'
    },
    'withdraw.html': {
        'title': 'Withdraw Earnings - Cash Kamai',
        'desc': 'Withdraw your earnings to bKash, Nagad, or Rocket. Fast and secure payment.'
    },
    'admin/index.html': {
        'title': 'Admin Panel - Cash Kamai',
        'desc': 'Cash Kamai Admin Panel. Manage users, withdrawals, settings and more.'
    },
    'admin-login.html': {
        'title': 'Admin Login - Cash Kamai',
        'desc': 'Secure admin login for Cash Kamai PTC platform management.'
    },
}

base = r'D:\DAA\ptc-website'
for fname, meta in files.items():
    f = os.path.join(base, fname)
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()

    og_lines = (
        '<meta property="og:title" content="' + meta['title'] + '">\n'
        '  <meta property="og:description" content="' + meta['desc'] + '">\n'
        '  <meta property="og:type" content="website">\n'
        '  <meta property="og:url" content="https://cashkamai.netlify.app/' + fname + '">\n'
        '  <meta property="og:image" content="https://cashkamai.netlify.app/favicon.ico">\n'
        '  <meta name="twitter:card" content="summary">\n'
        '  <meta name="twitter:title" content="' + meta['title'] + '">\n'
        '  <meta name="twitter:description" content="' + meta['desc'] + '">'
    )

    if 'og:title' not in content:
        content = content.replace('<meta name="viewport"', og_lines + '\n  <meta name="viewport"')
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(content)
        print('Added meta tags to ' + fname)
    else:
        print('Already has OG tags: ' + fname)

print('Done!')
