// OpenDota provides public professional match data without an API key.
const seriesNames = { 0: "Bo1", 1: "Bo3", 2: "Bo5", 3: "Bo2" };

// Fetch JSON with a 12-second time limit.
async function getJson(url) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } finally {
        clearTimeout(timeout);
    }
}

// "3 h ago", "2 d ago" — how long ago the match started.
function timeAgo(seconds) {
    const minutes = Math.floor((Date.now() / 1000 - seconds) / 60);
    if (minutes < 60) return `${Math.max(minutes, 1)} min ago`;
    if (minutes < 60 * 24) return `${Math.floor(minutes / 60)} h ago`;
    return `${Math.floor(minutes / 60 / 24)} d ago`;
}

// Team logo, or a round badge with the first letters of the name when there is no logo.
function teamLogo(name, team) {
    const initials = name.split(/\s+/).map((word) => word[0]).join("").slice(0, 3).toUpperCase();
    const $badge = $("<span>").addClass("team-logo").text(initials);
    if (team && team.logo_url) {
        $("<img>").attr({ src: team.logo_url, alt: "", loading: "lazy" })
            // If the image cannot be loaded, the initials stay visible.
            .on("error", function () { $(this).remove(); })
            .appendTo($badge);
    }
    return $badge;
}

export function initProMatches() {
    const $section = $("#pro-matches");
    if (!$section.length) return;
    const $button = $("#refresh-matches");
    const $status = $("#matches-status");
    const $list = $("#match-list");
    let loading = false;
    let teams = new Map(); // team_id -> team
    let teamsLoaded = false;

    async function loadTeams() {
        if (teamsLoaded) return teams;
        try {
            const data = await getJson("https://api.opendota.com/api/teams");
            teams = new Map(data.map((team) => [team.team_id, team]));
            teamsLoaded = true;
            renderTopTeams(data);
        } catch {
            // Logos are only decoration: the matches are shown without them.
            $("#top-teams-status").text("Could not load the team rating.");
        }
        return teams;
    }

    function teamSide(match, side) {
        const name = match[`${side}_name`] || (side === "radiant" ? "Radiant" : "Dire");
        const won = (side === "radiant") === match.radiant_win;
        const team = teams.get(match[`${side}_team_id`]);
        return $("<div>").addClass(`match-team ${side}${won ? " won" : ""}`).append(
            teamLogo(name, team),
            $("<strong>").text(name),
            $("<span>").addClass("match-side").text(side === "radiant" ? "Radiant" : "Dire"),
            won ? $("<span>").addClass("match-win").text("WIN") : null
        );
    }

    async function loadMatches() {
        if (loading) return;
        loading = true;
        $button.prop("disabled", true).text("Loading…");
        $section.attr("aria-busy", "true");
        $status.removeClass("field-error").text("Loading recent professional matches from OpenDota…");
        $list.empty();
        try {
            // Both requests run at the same time.
            const [data] = await Promise.all([getJson("https://api.opendota.com/api/proMatches"), loadTeams()]);
            if (!Array.isArray(data)) throw new Error("Unexpected response");
            const validMatches = data.filter((match) => match && Number.isSafeInteger(match.match_id) &&
                Number.isFinite(match.start_time) && Number.isFinite(match.duration) &&
                Number.isFinite(match.radiant_score) && Number.isFinite(match.dire_score) &&
                typeof match.radiant_win === "boolean");
            // A series has several games. Keep only the latest game of each series.
            const shownSeries = new Set();
            const matches = validMatches.filter((match) => {
                const series = match.series_id || match.match_id;
                if (shownSeries.has(series)) return false;
                shownSeries.add(series);
                return true;
            }).slice(0, 6);
            matches.forEach((match) => {
                const date = new Date(match.start_time * 1000);
                const duration = `${Math.floor(match.duration / 60)}:${String(match.duration % 60).padStart(2, "0")}`;
                const $card = $("<article>").addClass("match-card").append(
                    $("<p>").addClass("match-league").append(
                        $("<span>").text(match.league_name || "Professional match"),
                        seriesNames[match.series_type] ? $("<span>").addClass("match-series").text(seriesNames[match.series_type]) : null
                    ),
                    $("<div>").addClass("match-teams").append(
                        teamSide(match, "radiant"),
                        $("<p>").addClass("match-score").append(
                            $("<span>").addClass("radiant").text(match.radiant_score),
                            " : ",
                            $("<span>").addClass("dire").text(match.dire_score),
                            $("<small>").text("kills")
                        ),
                        teamSide(match, "dire")
                    ),
                    $("<p>").addClass("match-meta").append(
                        `Duration ${duration} · `,
                        $("<time>").attr({ datetime: date.toISOString(), title: date.toLocaleString("en-GB") }).text(timeAgo(match.start_time))
                    ),
                    $("<a>").attr({ href: `https://www.opendota.com/matches/${match.match_id}`, target: "_blank", rel: "noopener noreferrer" }).text("Match details ↗")
                );
                $list.append($card);
            });
            $status.text(matches.length ? `Showing ${matches.length} recent matches. Fetched at ${new Date().toLocaleTimeString("en-GB")}.` : "No recent matches are available. Try again later.");
        } catch {
            $status.addClass("field-error").text("Could not load matches. Check your connection, or try again shortly if OpenDota is busy.");
        } finally {
            loading = false;
            $section.attr("aria-busy", "false");
            $button.prop("disabled", false).text("Refresh matches");
            $(document).trigger("pagecontentchange");
        }
    }

    // The five teams with the highest OpenDota rating.
    function renderTopTeams(data) {
        const $top = $("#top-teams");
        if (!$top.length) return;
        $top.empty();
        const best = [...data].sort((a, b) => b.rating - a.rating).slice(0, 5);
        best.forEach((team, index) => {
            const games = team.wins + team.losses;
            const winRate = games ? Math.round((team.wins / games) * 100) : 0;
            $top.append($("<li>").addClass("top-team").append(
                $("<span>").addClass("top-team-place").text(index + 1),
                teamLogo(team.name, team),
                $("<strong>").text(team.name),
                $("<span>").addClass("top-team-record").text(`${team.wins}–${team.losses} · ${winRate}% wins`),
                $("<span>").addClass("top-team-rating").text(Math.round(team.rating))
            ));
        });
        $("#top-teams-status").text("Rating and results from OpenDota.");
    }

    $button.on("click", loadMatches);
    loadMatches();
}
