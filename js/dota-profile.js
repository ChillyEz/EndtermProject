// Profile page: public Dota 2 statistics of the player from OpenDota.
import { heroes } from "./data/heroes.js";

const idsKey = "dota-wiki-dota-ids"; // { "email": "friend id" } for every local account
const sessionKey = "dota-wiki-current-user";
const rankNames = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];

function readIds() {
    try { return JSON.parse(localStorage.getItem(idsKey)) || {}; }
    catch { return {}; }
}

function saveId(id) {
    const ids = readIds();
    const email = localStorage.getItem(sessionKey);
    if (id) ids[email] = id;
    else delete ids[email];
    localStorage.setItem(idsKey, JSON.stringify(ids));
}

async function getJson(path, signal) {
    const response = await fetch(`https://api.opendota.com/api/${path}`, { signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

export function initDotaProfile() {
    const $form = $("#dota-id-form");
    if (!$form.length) return;
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

    async function loadPlayer(id) {
        $error.text("");
        $result.empty();
        $status.text("Loading statistics from OpenDota…");
        $submit.prop("disabled", true);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            // Three requests run at the same time.
            const [player, winLoss, matches] = await Promise.all([
                getJson(`players/${id}`, controller.signal),
                getJson(`players/${id}/wl`, controller.signal),
                getJson(`players/${id}/recentMatches`, controller.signal)
            ]);
            if (!player.profile) {
                $status.text("");
                $error.text("No public profile was found for this ID. Check the number and the privacy settings in Dota 2.");
                return;
            }
            saveId(id);
            $clear.prop("hidden", false);
            renderPlayer(player, winLoss, Array.isArray(matches) ? matches : []);
            $status.text("Public data from OpenDota.");
        } catch {
            $status.text("");
            $error.text("Could not load statistics. Check your connection and try again.");
        } finally {
            clearTimeout(timeout);
            $submit.prop("disabled", false);
            $(document).trigger("pagecontentchange");
        }
    }

    $form.on("submit", (event) => {
        event.preventDefault();
        const id = $input.val().trim();
        if (!id) { $error.text("Enter your Dota 2 friend ID."); return; }
        if (!/^\d{1,10}$/.test(id)) { $error.text("The friend ID contains digits only, for example 86745912."); return; }
        loadPlayer(id);
    });

    $clear.on("click", () => {
        saveId(null);
        $input.val("");
        $result.empty();
        $status.text("");
        $error.text("");
        $clear.prop("hidden", true);
    });

    // Show the saved player again after a page reload.
    const savedId = readIds()[localStorage.getItem(sessionKey)];
    if (savedId) {
        $input.val(savedId);
        loadPlayer(savedId);
    }
}
