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
