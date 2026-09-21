if (window.location.pathname.endsWith("heroes.html")) {
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