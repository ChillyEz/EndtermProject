# Dota 2 Wiki

A responsive eight-page guide to heroes, items, lanes and professional matches, by Amir Baiseitov (SE-2505, team NotYet).

Extract the entire project folder. Open a terminal in the folder containing `index.html` and run `python -m http.server 8000`. Open http://localhost:8000/ in a browser. VS Code Live Server also supports the JavaScript modules used here.

Use HTTP localhost or HTTPS, rather than opening HTML files directly: ES modules and the Web Crypto password API need a suitable origin. jQuery 4.0.0 is bundled locally in `js/vendor` with its original license header. Only the professional match feed and external links need internet access.

Pages: Home, Heroes, Items, Map, Esports, Register, Log In and Profile. Profile is reached after login or through the account link in the header. It displays saved details and a personal hero pool with position coverage.

Code organization:

- `script.js`: shared navigation, themes, search, catalogs, quiz, contact form, animations and map interactions, with numbered sections.
- `heroes.js`, `items.js`: local catalog objects.
- `js/account.js`: JavaScript form validation, local signup/login/logout and per-account favourites.
- `js/validation.js`: shared email format checker.
- `js/esports.js`: OpenDota requests, loading state, timeout, error/retry and match rendering.
- `styles.css`: shared design tokens, layouts and component styles; Final additions are at the end.
- `heroes`, `images`, `fonts`: existing local assets.

Registration collects a player name, email, phone and password. Use fictional details and an unused demo password. Passwords are stored as salted PBKDF2 hashes; accounts and favourites are saved under `dota-wiki-users-v1`, and the current account under `dota-wiki-current-user`. Theme uses `dota-wiki-theme`. This is the required browser-only authentication simulation, not secure backend authentication; browser storage can be inspected or modified. Clear these site storage keys to reset the demo. The contact form validates its input but does not send a message.

The Esports page requests `https://api.opendota.com/api/proMatches` using `fetch` and displays up to six recent matches. It handles HTTP/network failures, empty responses and a 12-second timeout. OpenDota may delay or rate-limit responses. Catalog values and the lane diagram are educational reference material, not an automatically updated patch database.

Repository: https://github.com/ChillyEz/EndtermProject

Live website: https://chillyez.github.io/EndtermProject/index.html

Final checks: account creation, duplicate email, invalid credentials, refresh persistence, separate user pools, required/email/password/phone checks, quiz validation, all item dialogs and map pins, page search, responsive layouts and both themes. API error, empty, timeout and retry states are tested separately from the public endpoint.
