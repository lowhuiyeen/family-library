# Family Library (小金库图书馆)

Static web app ready for Firebase Realtime Database + EmailJS receipts.

## Setup
1) Put your real Firebase credentials into: `assets/firebase-config.js`
2) (Optional) Put your EmailJS public/service/template in `borrow.html` script tags.
3) Host on GitHub Pages or Firebase Hosting.

## Paths
- index.html (home)
- login.html (admin login - sets role=admin on success)
- library.html (catalog)
- admin.html (add/edit book; auto ID + google link)
- borrow.html (borrow/return + email receipt)

## Notes
- Language icons are under `assets/icons/`.
- Header & footer auto-load from `assets/`.
- Translations in `assets/lang.json`.
