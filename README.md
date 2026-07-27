# Cash Kamai - PTC Website (Paid To Click)

Watch ads, earn dollars! Withdraw via bKash/Nagad/Rocket.

## Features
- User registration & login (Email/Password)
- Watch ads & earn money
- Referral system
- Withdraw via bKash/Nagad/Rocket
- Premium/VIP membership
- Admin panel
- Real-time balance updates
- Firebase Realtime Database backend

## Setup Guide

### 1. Firebase Console
Go to: https://console.firebase.google.com (your project: club-fire-11)

### 2. Authentication
Sign-in method → Email/Password → Enable

### 3. Realtime Database
Create Database → Start in test mode

**Rules:**
```json
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}
```

### 4. Deploy to Netlify
Drag & drop `ptc-website` folder to https://netlify.com

### 5. First Admin
1. Register on your site
2. Firebase Console → Realtime Database → `users/{uid}` → add `isAdmin: true`
3. Admin panel at `/admin`

## File Structure
```
ptc-website/
├── index.html          # Landing page
├── login.html          # Login / Register
├── dashboard.html      # User dashboard
├── earn.html           # Watch ads page
├── withdraw.html       # Withdraw page
├── admin/
│   └── index.html      # Admin panel
├── css/
│   └── style.css       # Styles
├── js/
│   ├── firebase-config.js  # Firebase config (already set)
│   └── app.js              # All logic (RTDB)
└── README.md
```

## Earning Rates
| User Type | Per Ad | Daily Limit |
|-----------|--------|-------------|
| Free      | $0.05  | 20 ads      |
| Premium   | $0.10  | 100 ads     |
| VIP       | $0.50  | Unlimited   |

## Admin Model
Users earn in dollars. When withdrawing, admin pays equivalent BDT ($1 = ~120 BDT).
