import { items } from "./items.js";

const $grid = $(".item-grid");
const $purpose = $("#item-purpose");
const $dialog = $(".item-details");
const template = document.getElementById("item-card-template");

function showDetails(item) {
    $dialog.find(".detail-icon").attr("src", item.image);
    $dialog.find("#detail-name").text(item.name);
    $dialog.find(".item-cost").toggle(item.cost != null).find("span").text(item.cost ?? "");
    const $body = $dialog.find(".detail-body").empty();
    if (item.properties) {
        const $properties = $("<div>").addClass("item-properties").appendTo($body);
        for (const [label, value] of Object.entries(item.properties)) {
            $("<div>").text(label + ": " + value).appendTo($properties);
        }
    }
    if (item.stats) {
        const $stats = $("<div>").addClass("item-stats").appendTo($body);
        for (const stat of item.stats) $("<p>").text(stat).appendTo($stats);
    }
    for (const ability of item.abilities) {
        const $section = $("<section>").addClass("item-ability " + ability.type.toLowerCase() + "-ability").appendTo($body);
        const $heading = $("<h4>").appendTo($section);
        $("<span>").text(ability.type + ": " + ability.name).appendTo($heading);
        for (const [label, value] of Object.entries(ability.metrics ?? {})) {
            $("<small>").text(label + " " + value).appendTo($heading);
        }
        for (const line of ability.text) {
            const $line = $("<p>").appendTo($section);
            for (const part of line.split(/(\d+(?:\.\d+)?%?)/)) {
                if (/^\d/.test(part)) $("<strong>").text(part).appendTo($line);
                else $line.append(document.createTextNode(part));
            }
        }
    }
    if (item.lore) $("<p>").addClass("item-lore").text(item.lore).appendTo($body);
    $dialog[0].showModal();
    $(document).trigger("pagecontentchange");
}

for (const purpose of new Set(items.map(item => item.purpose))) {
    $purpose.append(new Option(purpose, purpose));
}

for (const item of items) {
    const $card = $(template.content.firstElementChild.cloneNode(true));
    $card.attr("data-purpose", item.purpose);
    $card.find(".item-name").text(item.name);
    $card.find(".item-image img").attr("src", item.image);
    $card.find(".item-description").text(item.summary);
    $card.find(".item-button").on("click", () => showDetails(item));
    $grid.append($card);
}

function filterItems() {
    const purpose = $purpose.val();
    let count = 0;
    $grid.children().each(function () {
        this.hidden = Boolean(purpose) && this.dataset.purpose !== purpose;
        if (!this.hidden) count++;
    });
    $("#item-count").text(count === 1 ? "1 item" : count + " items");
    $(document).trigger("pagecontentchange");
}

$dialog.find(".close-item").on("click", () => $dialog[0].close());
$dialog.on("close", () => $(document).trigger("pagecontentchange"));
$purpose.on("change", filterItems);
filterItems();
