// Hero details dialog (heroes.html): local hero data plus live statistics from OpenDota.
import { heroes } from "./data/heroes.js";

const rankNames = ["Herald", "Guardian", "Crusader", "Archon", "Legend", "Ancient", "Divine", "Immortal"];

// One request returns statistics for every hero, so the answer is kept and reused.
let savedStats = null;

async function loadHeroStats() {
    if (savedStats) return savedStats;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
        const response = await fetch("https://api.opendota.com/api/heroStats", { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Unexpected response");
        savedStats = data;
        return data;
    } finally {
        clearTimeout(timeout);
    }
}

function winRate(wins, games) {
    return games > 0 ? (wins / games) * 100 : null;
}

function formatPercent(value) {
    return value === null ? "—" : `${value.toFixed(1)}%`;
}

export function initHeroDetails() {
    const $dialog = $(".hero-details");
    if (!$dialog.length) return;
    const $status = $("#hero-stats-status");
    const $stats = $("#hero-stats");
    const $retry = $("#hero-stats-retry");
    let openHero = null;

    function addTile(label, value) {
        $("<div>").addClass("stat-tile").append(
            $("<strong>").text(value),
            $("<span>").text(label)
        ).appendTo($stats.find(".stat-tiles"));
    }

    function renderStats(stats) {
        // Public matches are split into eight rank brackets: 1_pick, 1_win ... 8_pick, 8_win.
        let games = 0;
        let wins = 0;
        const $ranks = $("<ul>").addClass("rank-bars");
        rankNames.forEach((rank, index) => {
            const rankGames = stats[`${index + 1}_pick`] || 0;
            const rankWins = stats[`${index + 1}_win`] || 0;
            if (!rankGames) return; // OpenDota sends no data for some ranks
            games += rankGames;
            wins += rankWins;
            const rate = winRate(rankWins, rankGames);
            // Win rates stay close to 50%, so the bar shows the 40-60% range.
            const width = rate === null ? 0 : Math.min(100, Math.max(4, (rate - 40) * 5));
            $("<li>").append(
                $("<span>").addClass("rank-name").text(rank),
                $("<span>").addClass("rank-track").append(
                    $("<span>").addClass(rate !== null && rate >= 50 ? "rank-fill winning" : "rank-fill")
                        .css("width", `${width}%`)
                ),
                $("<span>").addClass("rank-value").text(formatPercent(rate))
            ).appendTo($ranks);
        });

        $stats.empty().append($("<div>").addClass("stat-tiles"));
        addTile("Win rate", formatPercent(winRate(wins, games)));
        addTile("Public matches", games.toLocaleString("en-US"));
        addTile("Pro picks", stats.pro_pick ?? 0);
        addTile("Pro bans", stats.pro_ban ?? 0);

        $stats.append($("<h4>").text("Win rate by rank"), $ranks);

        const baseStats = {
            "Move speed": stats.move_speed,
            "Attack range": stats.attack_range,
            "Base damage": `${stats.base_attack_min}–${stats.base_attack_max}`,
            "Base armor": stats.base_armor,
            "Strength": `${stats.base_str} +${stats.str_gain}`,
            "Agility": `${stats.base_agi} +${stats.agi_gain}`,
            "Intelligence": `${stats.base_int} +${stats.int_gain}`
        };
        const $list = $("<dl>").addClass("base-stats");
        for (const [label, value] of Object.entries(baseStats)) {
            $list.append($("<dt>").text(label), $("<dd>").text(value));
        }
        $stats.append($("<h4>").text("Base stats"), $list);
    }

    async function showLiveStats(hero) {
        $retry.prop("hidden", true);
        $stats.empty();
        $status.removeClass("field-error").text("Loading live statistics from OpenDota…");
        $dialog.attr("aria-busy", "true");
        try {
            const allStats = await loadHeroStats();
            const stats = allStats.find((entry) => entry.id === hero.id);
            if (!stats) throw new Error("Hero not found");
            // Ignore the answer if another hero was opened while waiting.
            if (openHero !== hero) return;
            renderStats(stats);
            $status.text("Live data from recent public matches on OpenDota.");
        } catch {
            if (openHero !== hero) return;
            $status.addClass("field-error").text("Could not load live statistics. Check your connection and try again.");
            $retry.prop("hidden", false);
        } finally {
            $dialog.attr("aria-busy", "false");
        }
    }

    function showHero(hero) {
        openHero = hero;
        $dialog.find(".detail-icon").attr({ src: hero.image, alt: hero.name });
        $("#hero-detail-name").text(hero.name);
        $("#hero-detail-type").text(`${hero.attribute} · ${hero.attackType.join(" / ")} · Complexity ${hero.complexity}/3`);
        $("#hero-detail-positions").text(hero.positions.join(", "));
        $("#hero-detail-roles").text(hero.roles.join(", "));
        $dialog[0].showModal();
        showLiveStats(hero);
    }

    // Cards are re-created by the filters, so the click is handled on their container.
    $("#hero-sections").on("click", ".hero-open, .hero-portrait", function () {
        const id = Number($(this).closest(".hero-card").attr("data-hero-id"));
        const hero = heroes.find((entry) => entry.id === id);
        if (hero) showHero(hero);
    });

    $retry.on("click", () => { if (openHero) showLiveStats(openHero); });
    $dialog.find(".close-item").on("click", () => $dialog[0].close());
    // A click on the dark backdrop lands on the dialog element itself.
    $dialog.on("click", function (event) {
        if (event.target === this) this.close();
    });
}
