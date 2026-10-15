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




if (window.location.pathname.endsWith("index.html")) {
    const form = document.querySelector("#contact-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log("Form for contact submitted");
        const inputName = document.getElementById("name").value.trim();
        const inputEmail = document.getElementById("email").value.trim();
        const inputTopic = document.getElementById("topic").value.trim();
        const inputMessage = document.getElementById("message").value.trim();
        const errors = [];

        if(inputName === "") {
            errors.push("Name is required");
        }else if (inputName.length < 2) {
            errors.push("Name must contain more than 2 symbols");
        }


        const pattern = /^.+@.+\..+$/;   //validation EMail

        if (inputEmail === "") {
            errors.push("Email is required");
        } else if (!pattern.test(inputEmail)) {
            errors.push("Invalid email format");
        }

        if(inputTopic === "") {
            errors.push("Choose one of the listed Topic");
        }

        if(inputMessage === "") {
            errors.push("Please enter your message");
        }



        const formErorrs = document.getElementById("form-errors");
        const formResult = document.getElementById("form-result");
        formErorrs.textContent = "";
        formResult.textContent = "";

        if(errors.length === 0) {
            formResult.textContent = "Thank you for active participate! Message sent successfully!";
            form.reset()
        }else {
            formErorrs.textContent = errors.join("\n");
        }

    });

    const closeBtn = document.getElementById("close-contact");
    const popup = document.getElementById("open-contact");
    const overlay = document.getElementById("contact-popup");

    closeBtn.addEventListener("click", () =>{
            overlay.classList.remove("open");
    });

    popup.addEventListener("click", (event) => {
        const contactPopup = document.getElementById("contact-popup");
        contactPopup.classList.add("open");
    
    });
    overlay.addEventListener("click", (event) => {
        if(event.target === overlay){
            overlay.classList.remove("open");
        }
    });

}





const faqButtons= document.querySelectorAll(".faq-question");

faqButtons.forEach((button) => {

    button.addEventListener("click", () => {
        button.closest(".faq-item").classList.toggle("open");
   });

});



const navbarBurger = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".top-navbar");

if (navbarBurger && navbar) {
    navbarBurger.addEventListener("click", () => {
        navbar.classList.toggle("open");

        const isOpen = navbar.classList.contains("open");
        navbarBurger.setAttribute("aria-expanded", String(isOpen));
    });
}



if (window.location.pathname.endsWith("register.html")) {
const registerForm = document.getElementById("registration-form"); 

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const userName = document.getElementById("username").value.trim();
    const emailRegister = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    const registerErrors = [];
    
    const usernamePattern = /^[a-zA-Z]+\d*$/;
    

    if(userName === ""){
         registerErrors.push("Username cannot be blank");
    }else if(userName.length < 2){
        registerErrors.push("UUsername must contain more than 2 symbols");
    }
    else if(!usernamePattern.test(userName)){
        registerErrors.push("Username must start with a letter and NO special symbols!");
    }else {
        console.log("username is ok");
    }

    const pattern = /^.+@.+\..+$/; 
    if (emailRegister === "") {
            registerErrors.push("Email is required");
    } else if (!pattern.test(emailRegister )) {
            registerErrors.push("Invalid email format");
    }
    
    
    if (password === "" || confirmPassword === ""){
        registerErrors.push("Fill both password and confirm password fields!")
    }else if(password !== confirmPassword){
        registerErrors.push("Passwords does not match!");
    }
    if(password.length < 8){
        registerErrors.push("Password length must be at least 8 characters");
    }if(!/\d/.test(password)){
        registerErrors.push("Password must contain at least one digit");
    }

    const ErorrsContent = document.getElementById("register-errors");
    const ResultContent = document.getElementById("register-result");
    ErorrsContent.textContent = "";
    ResultContent.textContent = "";

    if(registerErrors.length === 0) {
        ResultContent .textContent = "Registration form validated successfully!";
        registerForm.reset()
    }else {
        ErorrsContent.textContent = registerErrors.join("\n");
    }

});
}


const pageMode = document.querySelector(".page-mode");

pageMode.addEventListener("click", () => {
    console.log("click mzfcj")
    document.body.classList.toggle("light-theme");

    const modeText = document.querySelector(".page-mode");
    const isLight = document.body.classList.contains("light-theme");
    modeText.textContent = isLight ? "Dark Mode" : "Light Mode";
});