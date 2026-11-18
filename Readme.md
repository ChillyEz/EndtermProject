# Dota 2 Wiki

A responsive eight-page guide to heroes, items, lanes and professional matches, by Amir Baiseitov (SE-2505, team NotYet).

Extract the entire project folder. Open a terminal in the folder containing `index.html` and run `python -m http.server 8000`. Open http://localhost:8000/ in a browser. VS Code Live Server also supports the JavaScript modules used here.

Use HTTP localhost or HTTPS, rather than opening HTML files directly: ES modules and the Web Crypto password API need a suitable origin. jQuery 4.0.0 is bundled locally in `js/vendor` with its original license header. Only the professional match feed and external links need internet access.

Pages: Home, Heroes, Items, Map, Esports, Register, Log In and Profile. Profile is reached after login or through the account link in the header. It displays saved details and a personal hero pool with position coverage.

Code organization:

- `*.html`: the eight pages, in the project root.
- `css/styles.css`: shared design tokens, layouts and component styles; Final additions are at the end.
- `js/script.js`: shared navigation, search, catalogs, quiz, contact form, animations and the hero of the day, with numbered sections.
- `js/theme.js`: Radiant (light) and Dire (dark) themes, early palette restoration and a radial View Transition. Older browsers use a color fade; reduced-motion mode changes themes immediately.
- `js/data/heroes.js`, `js/data/items.js`: local catalog objects.
- `js/account.js`: JavaScript form validation, local signup/login/logout and per-account favourites.
- `js/validation.js`: shared email format checker.
- `js/esports.js`: OpenDota match requests, loading state, timeout, error/retry and match rendering. Only the latest game of each series is listed.
- `js/hero-details.js`: hero details dialog with live win rates, pick counts and base stats from OpenDota.
- `js/dota-profile.js`: Profile page statistics. A friend ID is validated, saved per account under `dota-wiki-dota-ids`, and used to request the player, win/loss and recent matches from OpenDota. New accounts start with public profile `1540500781`; a saved custom ID takes priority, and explicit removal stays cleared after reload. Requests are cancelled and version-checked to prevent late responses from restoring removed data.
- `js/map.js`, `js/data/map-objects.js`: interactive map, its layers and the match clock; marker positions are percentages of the map image.
- `js/vendor`: bundled jQuery.
- `images/heroes`, `images/items`, `images/attributes`, `images/map`, `images/background`, `images/ui`: local images.
- `sounds`, `fonts`: interface sounds and web fonts.

Registration collects a player name, email, phone and password. Use fictional details and an unused demo password. Passwords are stored as salted PBKDF2 hashes; accounts and favourites are saved under `dota-wiki-users-v1`, and the current account under `dota-wiki-current-user`. Theme uses `dota-wiki-theme`. Hero filters and sorting use `dota-wiki-hero-filters`, so the Heroes page reopens with the last selection. The Items page uses a compact shop grid with Basics/Upgrades groups, item details and a purchase panel. It saves its search, purpose and sorting under `dota-wiki-item-filters`, the planned purchase under `dota-wiki-starting-build` and its gold amount (600 by default) under `dota-wiki-build-gold`. This is the required browser-only authentication simulation, not secure backend authentication; browser storage can be inspected or modified. Clear these site storage keys to reset the demo. The contact form validates its input but does not send a message.

Radiant uses light stone, cyan rune highlights and gold details; Dire uses cool dark stone, crimson and fire. Each faction uses supplied base artwork for the page background and a separate hero-silhouette banner in the header. All four images use WebP at their original dimensions. The other background preloads after the page has loaded. The theme is restored before CSS paints to avoid flashing the other faction during navigation. The existing `light`/`dark` storage values remain compatible. The faction marks and textures are custom SVG graphics. Ability colors remain semantic: Use is green, Active is blue and Passive is grey.

The Esports page requests `https://api.opendota.com/api/proMatches` using `fetch` and displays up to six recent matches. It handles HTTP/network failures, empty responses and a 12-second timeout. On the Heroes page, selecting a hero name or portrait opens a dialog that requests `https://api.opendota.com/api/heroStats` once and shows that hero's win rate by rank, pick counts and base stats, with loading, error and retry states. The same response adds a win rate badge to every hero card and enables sorting by win rate or popularity. OpenDota may delay or rate-limit responses. The Map page places towers, Ancients, neutral camps, runes, watchers, an outpost and Roshan on the map from `js/data/map-objects.js`. Markers can be selected, layers can be hidden, and the match clock (from -1:00) shows rune spawns, camp states, day and night, and Roshan moving between his two pits. Catalog values, clock timings and the lane diagram are educational reference material, not an automatically updated patch database.

Repository: https://github.com/ChillyEz/EndtermProject

Live website: https://chillyez.github.io/EndtermProject/index.html

Final checks: account creation, duplicate email, invalid credentials, refresh persistence, separate user pools, required/email/password/phone checks, quiz validation, all item dialogs and map pins, page search, responsive layouts and both themes. API error, empty, timeout and retry states are tested separately from the public endpoint.
