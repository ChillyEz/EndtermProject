import { heroes } from "./heroes.js";

if (window.location.pathname.endsWith("heroes.html")) {

const heroSections = document.querySelector("#hero-sections");
const searchInput = document.querySelector("#hero-search");
const attributeFilter = document.querySelector("#attribute-filter");
const complexityFilter = document.querySelector("#complexity-filter");

const attributes = [
    "Strength",
    "Agility",
    "Intelligence",
    "Universal"
];
const attributeImages = {
    Strength: "heroes/web-ui/strength.png",
    Agility: "heroes/web-ui/agility.png",
    Intelligence: "heroes/web-ui/intelligence.png",
    Universal: "heroes/web-ui/universal.png"
};

function renderHeroes(heroList) {

    heroSections.innerHTML = "";

    attributes.forEach(function(attribute) {

        const section = document.createElement("section");
        section.classList.add("hero-section");

        section.innerHTML = `
            <h3 class="attribute-title">
            <img src="${attributeImages[attribute]}" alt="${attribute}">
            <span>${attribute}</span>
            </h3>

            <div class="hero-gallery"></div>
        `;

        const gallery = section.querySelector(".hero-gallery");

        heroList.forEach(function(hero) {

            if (hero.attribute === attribute) {

                const card = document.createElement("article");
                card.classList.add("hero-card");

                card.innerHTML = `
                <img src="${hero.image}" alt="${hero.name}">
                <div class="hero-caption">${hero.name}</div>
                    `;

                gallery.appendChild(card);
            }
        });

        heroSections.appendChild(section);
    });
}
searchInput.addEventListener("input", filterHeroes);

attributeFilter.addEventListener("change", filterHeroes);

complexityFilter.addEventListener("change", filterHeroes);

renderHeroes(heroes);

function filterHeroes() {

    const searchText = searchInput.value.toLowerCase();
    const selectedAttribute = attributeFilter.value;
    const selectedComplexity = complexityFilter.value;

    const filteredHeroes = heroes.filter(function(hero) {

        const matchesSearch =
            hero.name.toLowerCase().includes(searchText);

        const matchesAttribute =
            selectedAttribute === "All" ||
            hero.attribute === selectedAttribute;

        const matchesComplexity =
            selectedComplexity === "All" ||
            hero.complexity === Number(selectedComplexity);

        return matchesSearch &&
               matchesAttribute &&
               matchesComplexity;
    });

    renderHeroes(filteredHeroes);
}

const form = document.querySelector("#hero-form");

function addHeroCard() {
    const heroNameInput = document.querySelector("#hero-name").value;
    const heroDescriptionInput = document.querySelector("#hero-description").value;
    const heroGifInput = document.querySelector("#hero-gif").value;
    
    const heroGrid = document.querySelector(".hero-grid");

    const cardDom = document.createElement("article");
    cardDom.classList.add("hero-card");
    
    const heroNameDom = document.createElement("h3");
    heroNameDom.classList.add("hero-name");
    heroNameDom.textContent = heroNameInput;

    const heroDescriptionDom = document.createElement("p");
    heroDescriptionDom.classList.add("hero-description");
    heroDescriptionDom.textContent = heroDescriptionInput;

    const heroGifDom = document.createElement("div");
    heroGifDom.classList.add("tenor-gif-embed");

    const heroGifEmbed = document.createElement("img");
    heroGifEmbed.src = heroGifInput;
    heroGifEmbed.alt = "Hero GIF";

    heroGifDom.append(heroGifEmbed);
    cardDom.append(heroNameDom, heroGifDom, heroDescriptionDom);

    heroGrid.append(cardDom);
}


form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log("Form submitted");
    addHeroCard();
});
}

if (window.location.pathname.endsWith("index.html")) {
    const form = document.querySelector("#contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form for contact submitted");
        alert("Thank you for your message! We will get back to you soon.");
    });
}

const itemButtons = document.querySelectorAll(".item-button");
const closeButtons = document.querySelectorAll(".close-item");

itemButtons.forEach(function (button) {
    button.addEventListener("click", function () {

        document.querySelectorAll(".item-card.details-open")
            .forEach(function (card) {
                card.classList.remove("details-open");
            });

        const card = button.closest(".item-card");
        card.classList.add("details-open");
    });
}); 


closeButtons.forEach(function (button) {

    button.addEventListener("click", function () {
        const card = button.closest(".item-card");
        card.classList.remove("details-open");

    });

});