// OpenDota provides public professional match data without an API key.
export function initProMatches() {
    const $section = $("#pro-matches");
    if (!$section.length) return;
    const $button = $("#refresh-matches");
    const $status = $("#matches-status");
    const $list = $("#match-list");
    let loading = false;

    async function loadMatches() {
        if (loading) return;
        loading = true;
        $button.prop("disabled", true).text("Loading…");
        $section.attr("aria-busy", "true");
        $status.removeClass("field-error").text("Loading recent professional matches from OpenDota…");
        $list.empty();
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        try {
            const response = await fetch("https://api.opendota.com/api/proMatches", { signal: controller.signal });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            if (!Array.isArray(data)) throw new Error("Unexpected response");
            const matches = data.filter((match) => match && Number.isSafeInteger(match.match_id) &&
                Number.isFinite(match.start_time) && Number.isFinite(match.duration) &&
                Number.isFinite(match.radiant_score) && Number.isFinite(match.dire_score) &&
                typeof match.radiant_win === "boolean").slice(0, 6);
            matches.forEach((match) => {
                const radiant = match.radiant_name || "Radiant";
                const dire = match.dire_name || "Dire";
                const date = new Date(match.start_time * 1000);
                const duration = `${Math.floor(match.duration / 60)}:${String(match.duration % 60).padStart(2, "0")}`;
                const $card = $("<article>").addClass("match-card").append(
                    $("<p>").addClass("match-league").text(match.league_name || "Professional match"),
                    $("<h3>").text(`${radiant} vs ${dire}`),
                    $("<p>").addClass("match-score").text(`${match.radiant_score} : ${match.dire_score}`),
                    $("<p>").addClass("match-winner").text(`Winner: ${match.radiant_win ? radiant : dire}`),
                    $("<p>").addClass("match-meta").text(`Kills · Duration ${duration} · `).append(
                        $("<time>").attr("datetime", date.toISOString()).text(date.toLocaleDateString("en-GB"))
                    ),
                    $("<a>").attr({ href: `https://www.opendota.com/matches/${match.match_id}`, target: "_blank", rel: "noopener noreferrer" }).text("Match details ↗")
                );
                $list.append($card);
            });
            $status.text(matches.length ? `Showing ${matches.length} recent matches. Fetched at ${new Date().toLocaleTimeString("en-GB")}.` : "No recent matches are available. Try again later.");
        } catch {
            $status.addClass("field-error").text("Could not load matches. Check your connection, or try again shortly if OpenDota is busy.");
        } finally {
            clearTimeout(timeout);
            loading = false;
            $section.attr("aria-busy", "false");
            $button.prop("disabled", false).text("Refresh matches");
            $(document).trigger("pagecontentchange");
        }
    }
    $button.on("click", loadMatches);
    loadMatches();
}
