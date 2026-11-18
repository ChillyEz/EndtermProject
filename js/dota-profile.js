// Profile page: public Dota 2 statistics of the player from OpenDota.
import { heroes } from "./data/heroes.js";

const idsKey = "dota-wiki-dota-ids"; // { "email": "friend id" } for every local account
const sessionKey = "dota-wiki-current-user";
const defaultId = "1540500781";
const rankNames = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];

function readIds() {
    try {
        const value = JSON.parse(localStorage.getItem(idsKey));
        return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    }
    catch { return {}; }
}

function saveId(email, id) {
    try {
        const ids = readIds();
        // An empty value remembers an explicit removal instead of restoring the default.
        ids[email] = id;
        localStorage.setItem(idsKey, JSON.stringify(ids));
        return true;
    } catch { return false; }
}

async function getJson(path, signal) {
    const response = await fetch(`https://api.opendota.com/api/${path}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export function initDotaProfile() {
    const $form = $("#dota-id-form");
    if (!$form.length) return;
    let email;
    try { email = localStorage.getItem(sessionKey); } catch { return; }
    if (!email) return;
    let activeController = null;
    let requestVersion = 0;
    const $input = $("#dota-id");
    const $error = $("#dota-id-error");
    const $status = $("#dota-status");
    const $result = $("#dota-result");
    const $clear = $("#dota-id-clear");
    const $submit = $form.find("button[type='submit']");

    function renderPlayer(player, winLoss, matches) {
        const games = winLoss.win + winLoss.lose;
        const winRate = games ? `${((winLoss.win / games) * 100).toFixed(1)}%` : "—";
        // rank_tier is two digits: 53 means the fifth rank (Legend), third star.
        const tier = player.rank_tier;
        const rank = tier ? `${rankNames[Math.floor(tier / 10) - 1]} ${tier % 10 || ""}`.trim() : "Unranked";

        $result.empty().append(
            $("<div>").addClass("dota-player").append(
                $("<img>").attr({ src: player.profile.avatarmedium, alt: "" }),
                $("<div>").append(
                    $("<h3>").text(player.profile.personaname),
                    $("<p>").text(`Rank: ${rank}`)
                )
            ),
            $("<div>").addClass("stat-tiles").append(
                $("<div>").addClass("stat-tile").append($("<strong>").text(winLoss.win), $("<span>").text("Wins")),
                $("<div>").addClass("stat-tile").append($("<strong>").text(winLoss.lose), $("<span>").text("Losses")),
                $("<div>").addClass("stat-tile").append($("<strong>").text(winRate), $("<span>").text("Win rate")),
                $("<div>").addClass("stat-tile").append($("<strong>").text(games), $("<span>").text("Matches"))
            )
        );

        if (!matches.length) return;
        const $list = $("<ul>").addClass("recent-matches");
        matches.slice(0, 5).forEach((match) => {
            const hero = heroes.find((entry) => entry.id === match.hero_id);
            // Slots 0-127 belong to Radiant, 128 and above to Dire.
            const isRadiant = match.player_slot < 128;
            const won = isRadiant === match.radiant_win;
            const minutes = Math.floor(match.duration / 60);
            $list.append($("<li>").append(
                hero ? $("<img>").attr({ src: hero.image, alt: "" }) : $("<span>"),
                $("<span>").addClass("match-hero").text(hero ? hero.name : "Unknown hero"),
                $("<span>").addClass(won ? "match-result won" : "match-result").text(won ? "Won" : "Lost"),
                $("<span>").text(`${match.kills} / ${match.deaths} / ${match.assists}`),
                $("<span>").text(`${minutes} min`)
            ));
        });
        $result.append($("<h3>").text("Recent matches"), $list);
    }

    function cancelLoad() {
        requestVersion += 1;
        activeController?.abort();
        activeController = null;
    }

    async function loadPlayer(id) {
        cancelLoad();
        const version = requestVersion;
        $error.text("");
        $result.empty();
        $status.text("Loading statistics from OpenDota…");
        $submit.prop("disabled", true);
        $form.attr("aria-busy", "true");
        $clear.prop("hidden", false);
        const controller = new AbortController();
        activeController = controller;
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            // Three requests run at the same time.
            const [player, winLoss, matches] = await Promise.all([
                getJson(`players/${id}`, controller.signal),
                getJson(`players/${id}/wl`, controller.signal),
                getJson(`players/${id}/recentMatches`, controller.signal)
            ]);
            // Aborting fetch alone is insufficient if an older response has already resolved.
            if (version !== requestVersion) return;
            if (!player?.profile) {
                $status.text("");
                $error.text("No public profile was found for this ID. Check the number and the privacy settings in Dota 2.");
                return;
            }
            if (!winLoss || !Number.isFinite(winLoss.win) || !Number.isFinite(winLoss.lose)) {
                throw new Error("Invalid win/loss response");
            }
            const saved = saveId(email, id);
            $clear.prop("hidden", false);
            renderPlayer(player, winLoss, Array.isArray(matches) ? matches : []);
            $status.text(saved ? "Public data from OpenDota." : "Statistics loaded. Browser storage is unavailable; this ID could not be saved.");
        } catch {
            if (version !== requestVersion) return;
            $status.text("");
            $error.text("Could not load statistics. Check your connection and try again.");
        } finally {
            clearTimeout(timeout);
            if (version === requestVersion) {
                activeController = null;
                $submit.prop("disabled", false);
                $form.attr("aria-busy", "false");
                $(document).trigger("pagecontentchange");
            }
        }
    }

    $form.on("submit", (event) => {
        event.preventDefault();
        const id = $input.val().trim();
        if (!id) { $error.text("Enter your Dota 2 friend ID."); return; }
        if (!/^\d{1,10}$/.test(id) || Number(id) === 0) { $error.text("The friend ID contains digits only, for example 86745912."); return; }
        loadPlayer(id);
    });

    $clear.on("click", () => {
        cancelLoad();
        const saved = saveId(email, "");
        $submit.prop("disabled", false);
        $form.attr("aria-busy", "false");
        $input.val("");
        $result.empty();
        $status.text("");
        $error.text("");
        $clear.prop("hidden", true);
        if (!saved) $error.text("Cleared for this visit. Browser storage is unavailable; the saved ID could not be removed.");
        $(document).trigger("pagecontentchange");
    });

    // Preserve a custom ID or an explicit removal; use the default for a new account.
    const savedId = readIds()[email];
    const initialId = savedId === "" ? "" :
        (typeof savedId === "string" && /^\d{1,10}$/.test(savedId) && Number(savedId) > 0 ? savedId : defaultId);
    $input.val(initialId);
    if (initialId) loadPlayer(initialId);
}
