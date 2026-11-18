// Interactive map (map.html): markers, layers, the info panel and the match clock.
import { objectTypes, layers, mapObjects, roshanPits, tormentorSpots, powerRunes, floodedCampStages } from "./data/map-objects.js";

const firstMinute = -1;
const lastMinute = 40;

function formatTime(minute) {
    return `${minute}:00`;
}

// Fisher-Yates shuffle: returns a new array in random order.
function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// Decide once which power rune appears at every even minute from 6:00.
// A rune type is not repeated until all seven have appeared.
// The spot (top or bottom) is random in the game, so the map shows both spots as possible.
function buildPowerSchedule() {
    const schedule = {};
    let bag = [];
    for (let minute = 6; minute <= lastMinute; minute += 2) {
        if (!bag.length) bag = shuffle(powerRunes);
        schedule[minute] = bag.pop();
    }
    return schedule;
}

function isNight(minute) {
    // Day and night switch every five minutes. The match starts in the daytime.
    return minute >= 0 && Math.floor(minute / 5) % 2 === 1;
}

export function initMap() {
    const stage = document.getElementById("map-stage");
    if (!stage) return;
    const slider = document.getElementById("clock-slider");
    const powerSchedule = buildPowerSchedule();
    let selected = null;

    // ---------- Markers ----------
    mapObjects.forEach((object) => {
        const type = objectTypes[object.type];
        const button = document.createElement("button");
        button.type = "button";
        button.className = `map-marker marker-${object.type}`;
        if (object.side) button.classList.add(object.side);
        button.dataset.layer = type.layer;
        button.style.left = `${object.x}%`;
        button.style.top = `${object.y}%`;
        button.title = object.name;
        button.setAttribute("aria-label", object.name);
        // An object can have its own icon (for example the Dire Ancient), otherwise the icon of its type.
        const iconSrc = object.icon || (object.side === "dire" && type.direIcon) || type.icon;
        if (iconSrc) {
            const icon = document.createElement("img");
            icon.src = iconSrc;
            icon.alt = "";
            button.append(icon);
        } else {
            button.textContent = object.pin;
        }
        button.addEventListener("click", (event) => {
            event.stopPropagation();
            selectObject(object);
        });
        object.button = button;
        stage.append(button);
    });

    // ---------- Layers ----------
    const layerBox = document.getElementById("map-layers");
    layers.forEach((layer) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = true;
        checkbox.addEventListener("change", () => {
            stage.classList.toggle(`hide-${layer.id}`, !checkbox.checked);
        });
        // The text is wrapped in a span: then search highlights inside it do not split the flex row.
        const text = document.createElement("span");
        text.textContent = layer.label;
        label.append(checkbox, text);
        // Hovering a layer name highlights all of its markers.
        label.addEventListener("mouseenter", () => stage.dataset.highlight = layer.id);
        label.addEventListener("mouseleave", () => delete stage.dataset.highlight);
        layerBox.append(label);
    });

    // ---------- What an object is doing at a given minute ----------
    // Returns { active, icon, status }. "active" markers glow, the others are faded.
    function stateOf(object, minute) {
        const type = objectTypes[object.type];
        switch (object.type) {
            case "bounty": {
                // The first bounty runes (0:00) are in the river; this spot starts at 3:00.
                const active = minute >= 3 && minute % 3 === 0;
                const next = minute < 3 ? 3 : minute + 3 - (minute % 3);
                return { active, status: active ? "A bounty rune is here now." : `Next bounty rune here at ${formatTime(next)}.` };
            }
            case "wisdom": {
                const active = minute >= 7 && minute % 7 === 0;
                const next = minute < 7 ? 7 : minute + 7 - (minute % 7);
                return { active, status: active ? "A wisdom rune is here now." : `Next wisdom rune at ${formatTime(next)}.` };
            }
            case "river": {
                if (minute === 0) {
                    return { active: true, icon: objectTypes.bounty.icon, status: "The first bounty rune is here (only at 0:00)." };
                }
                if (minute === 2 || minute === 4) {
                    return { active: true, icon: type.icon, status: "A water rune is here now." };
                }
                const power = powerSchedule[minute];
                if (power) {
                    return {
                        active: true, maybe: true, icon: power.icon,
                        status: `${power.name} rune appears now at the top OR the bottom spot. The game picks one at random.`
                    };
                }
                if (minute < 0) return { active: false, icon: objectTypes.bounty.icon, status: "A bounty rune appears here at 0:00." };
                if (minute < 2) return { active: false, icon: type.icon, status: "First water rune at 2:00." };
                if (minute < 4) return { active: false, icon: type.icon, status: "Next water rune at 4:00." };
                return { active: false, status: `Next power rune at ${formatTime(minute < 6 ? 6 : minute + 1)}, here or at the other spot.` };
            }
            case "campSmall":
            case "campMedium":
            case "campLarge":
            case "campAncient":
                return minute >= 1
                    ? { active: true, status: "Creeps are in the camp. An empty camp refills every minute." }
                    : { active: false, status: "Empty. Neutral creeps first appear at 1:00." };
            case "campFlooded": {
                if (minute < 1) return { active: false, icon: floodedCampStages[0].icon, status: "Empty. Neutral creeps first appear at 1:00." };
                // Take the last icon whose start minute has already passed.
                const current = floodedCampStages.filter((entry) => minute >= entry.from).pop();
                const upgrades = Math.floor(minute / 5);
                return {
                    active: true, icon: current.icon,
                    status: upgrades
                        ? `Creeps upgraded so far: ${upgrades}. Next upgrade at ${formatTime((upgrades + 1) * 5)}.`
                        : "No upgrades yet. The first creep is upgraded at 5:00."
                };
            }
            case "roshan":
                return {
                    active: true,
                    status: isNight(minute) ? "Night: Roshan is in the bottom pit." : "Day: Roshan is in the top pit."
                };
            case "tormentor": {
                const spot = isNight(minute) ? tormentorSpots.top : tormentorSpots.bottom;
                return {
                    active: true, icon: spot.icon,
                    status: isNight(minute) ? "Night: the Tormentor is in the top corner." : "Day: the Tormentor is in the bottom corner."
                };
            }
            case "lotus": {
                if (minute < 3) return { active: false, status: "The first lotus grows at 3:00." };
                const fresh = minute % 3 === 0;
                const next = minute + 3 - (minute % 3);
                return { active: true, status: fresh ? "A new lotus has just grown." : `Next lotus at ${formatTime(next)}.` };
            }
            default:
                return { active: true, status: "" };
        }
    }

    // ---------- Info panel ----------
    function showInfo(object, minute) {
        const type = objectTypes[object.type];
        const state = stateOf(object, minute);
        const icon = document.getElementById("map-info-icon");
        const image = object.button.querySelector("img");
        icon.hidden = !image;
        if (image) icon.src = image.src;
        document.getElementById("map-info-title").textContent = object.name;
        document.getElementById("map-info-text").textContent = object.text || type.text;
        document.getElementById("map-info-status").textContent = state.status;
    }

    function selectObject(object) {
        if (selected) selected.button.setAttribute("aria-pressed", "false");
        selected = object;
        object.button.setAttribute("aria-pressed", "true");
        // Markers of the same kind are highlighted together.
        stage.dataset.selectedType = object.type;
        showInfo(object, Number(slider.value));
        $(document).trigger("pagecontentchange");
    }

    // Helper for adding new markers: Shift + click shows the coordinates of the point.
    stage.addEventListener("click", (event) => {
        if (!event.shiftKey) return;
        const box = stage.getBoundingClientRect();
        const x = ((event.clientX - box.left) / box.width) * 100;
        const y = ((event.clientY - box.top) / box.height) * 100;
        document.getElementById("map-info-status").textContent = `Coordinates: x: ${x.toFixed(1)}, y: ${y.toFixed(1)}`;
    });

    // ---------- Match clock ----------
    // Events for the "Happening now" and "Coming next" lists.
    const clockEvents = [
        { name: "Bounty runes", start: 0, every: 3, tip: (minute) => minute === 0
            ? "The first two appear at the river rune spots (only this time)."
            : "One in each team's jungle by the river. Supports collect them for team gold." },
        { name: "Flooded camps", start: 5, every: 5, tip: () => "One creep in every flooded camp is upgraded." },
        { name: "Neutral creeps", start: 1, every: 1, end: 1, tip: () => "Jungle camps fill for the first time and refill every minute." },
        { name: "Water runes", start: 2, every: 2, end: 4, tip: () => "Both river spots. They restore health and mana." },
        { name: "Healing Lotus", start: 3, every: 3, tip: () => "A new lotus grows in both Lotus Pools." },
        { name: "Day and night", start: 5, every: 5, tip: (minute) => isNight(minute)
            ? "Night falls. Roshan moves to the bottom pit, the Tormentor to the top corner."
            : "Day breaks. Roshan returns to the top pit, the Tormentor to the bottom corner." },
        { name: "Power rune", start: 6, every: 2, tip: (minute) =>
            `${powerSchedule[minute].name}, at the top or the bottom river spot (random). Check both.` },
        { name: "Wisdom runes", start: 7, every: 7, tip: () => "Bonus experience at both edges of the map." }
    ];

    function happensAt(event, minute) {
        if (minute < event.start || (event.end !== undefined && minute > event.end)) return false;
        return (minute - event.start) % event.every === 0;
    }

    function addListItem(list, strongText, text) {
        const item = document.createElement("li");
        if (strongText) {
            const strong = document.createElement("strong");
            strong.textContent = strongText;
            item.append(strong, " — ");
        }
        item.append(text);
        list.append(item);
    }

    function showMinute(minute) {
        document.getElementById("clock-time").textContent = formatTime(minute);
        const night = isNight(minute);
        const phase = document.getElementById("clock-phase");
        phase.textContent = night ? "Night" : "Day";
        phase.classList.toggle("night", night);
        stage.classList.toggle("night", night);

        // Update every marker: glow or fade, and swap the icon when the rune or camp changes.
        mapObjects.forEach((object) => {
            const state = stateOf(object, minute);
            object.button.classList.toggle("waiting", !state.active);
            object.button.classList.toggle("maybe", Boolean(state.maybe));
            if (state.icon) object.button.querySelector("img").src = state.icon;
            if (object.type === "roshan") {
                const pit = night ? roshanPits.bottom : roshanPits.top;
                object.button.style.left = `${pit.x}%`;
                object.button.style.top = `${pit.y}%`;
            }
            if (object.type === "tormentor") {
                const spot = night ? tormentorSpots.top : tormentorSpots.bottom;
                object.button.style.left = `${spot.x}%`;
                object.button.style.top = `${spot.y}%`;
            }
        });
        if (selected) showInfo(selected, minute);

        const nowList = document.getElementById("clock-now");
        nowList.replaceChildren();
        if (minute < 0) addListItem(nowList, "Pre-game", "Heroes buy items and walk to their lanes. Roshan is already in the top pit, the Tormentor in the bottom corner.");
        clockEvents.filter((event) => happensAt(event, minute))
            .forEach((event) => addListItem(nowList, event.name, event.tip(minute)));
        if (!nowList.children.length) addListItem(nowList, "", "Nothing new this minute. Farm and watch the minimap.");

        // For every event, find the first later minute when it happens again.
        const upcoming = [];
        clockEvents.forEach((event) => {
            for (let next = minute + 1; next <= lastMinute; next++) {
                if (happensAt(event, next)) {
                    upcoming.push({ minute: next, name: event.name });
                    break;
                }
            }
        });
        upcoming.sort((a, b) => a.minute - b.minute);
        const nextList = document.getElementById("clock-next");
        nextList.replaceChildren();
        upcoming.forEach((entry) => addListItem(nextList, "", `${formatTime(entry.minute)} — ${entry.name}`));
        $(document).trigger("pagecontentchange");
    }

    // Play moves the slider one minute forward every 0.8 seconds.
    const playButton = document.getElementById("clock-play");
    let playTimer = null;
    function stopClock() {
        clearInterval(playTimer);
        playTimer = null;
        playButton.textContent = "Play";
    }
    playButton.addEventListener("click", () => {
        if (playTimer) { stopClock(); return; }
        if (Number(slider.value) >= lastMinute) slider.value = firstMinute;
        playButton.textContent = "Pause";
        playTimer = setInterval(() => {
            slider.value = Number(slider.value) + 1;
            showMinute(Number(slider.value));
            if (Number(slider.value) >= lastMinute) stopClock();
        }, 800);
    });
    document.getElementById("clock-reset").addEventListener("click", () => {
        stopClock();
        slider.value = firstMinute;
        showMinute(firstMinute);
    });
    slider.addEventListener("input", () => showMinute(Number(slider.value)));

    // The clock starts one minute before the horn.
    slider.min = firstMinute;
    slider.max = lastMinute;
    slider.value = firstMinute;
    showMinute(firstMinute);
}
