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


        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;   //validation EMail

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





const faqButtons = document.querySelectorAll(".faq-question");

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
    
    const usernamePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
    

    if(userName === ""){
         registerErrors.push("Username cannot be blank");
    }else if(userName.length < 3){
        registerErrors.push("Username must contain at least 3 symbols");
    }
    else if(!usernamePattern.test(userName)){
        registerErrors.push("Username must start with a letter and NO special symbols!");
    }else {
        console.log("username is ok");
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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


// const pageMode = document.querySelector(".page-mode");

// pageMode.addEventListener("click", () => {
//     document.body.classList.toggle("light-theme");

//     const modeText = document.querySelector(".page-mode");
//     const isLight = document.body.classList.contains("light-theme");
//     modeText.textContent = isLight ? "Dark Mode" : "Light Mode";
// });


const colors = [
    "#121212",
    "#303F50",
    "#354735",
    "#503535",
    "#504530"
];



const pageMode = document.querySelector(".page-mode");
let colorIndex = 0;

pageMode.addEventListener("click", () => {
    const color = `#${Math.floor(Math.random() * 16777216).toString(16).padStart(6, "0")}`;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = colors[colorIndex];
    // document.body.style.backgroundColor = color;
    colorIndex = (colorIndex + 1) % colors.length;
});




const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

let is12Hour = false;
const timeFormatButton = document.getElementById("toggle-time-format");

timeFormatButton.addEventListener("click", () => {
    is12Hour = !is12Hour;



    timeFormatButton.textContent = is12Hour ? "Switch to 24H" : "Switch to 12H";
    updateDateTime();
});
function updateDateTime() {
    const now = new Date();
    let formattedDate = now.toLocaleDateString("en-US",
        {
            year: "numeric",
            month: "long",
            day: "numeric"
        }
    );
    let formattedTime =now.toLocaleTimeString("en-US",
        {
            hour: "2-digit",
            minute:"2-digit",
            second:"2-digit",
            hour12: is12Hour
        }
    );

    const currentDateTime = document.getElementById("current-datetime");

    currentDateTime.textContent = formattedDate + " | " + formattedTime;
    
}

// const now = new Date();

// const year = now.getFullYear();
// const month = now.getMonth() + 1;
// const date = now.getDate();
// const day = now.getDay();
// const hour = now.getHours();
// const minute = now.getMinutes();
// const second = now.getSeconds();

// const monthName = months[now.getMonth()];
const patch732= new Date("2022-08-24T03:44:00+05:00");
const patch732end = new Date("2023-04-21T04:48:00+05:00");

const patch739= new Date("2025-05-23T03:08:00+05:00");
const patch739end = new Date("2025-12-16T05:07:00+05:00");

const patch741 = new Date("2026-03-25T04:43:00+05:00");

const patch741f = new Date("2026-09-15T23:44:00+05:00");

const patch741e = new Date("2026-07-31T04:58:00+05:00");
const patch741d = new Date("2026-06-05T05:45:00+05:00");


function calculatePatchDuration(patchStart, patchEnd, elementId) {
    const difference = patchEnd - patchStart;

    const days = Math.floor(difference / 86400000);
    const hours = Math.floor(difference / 3600000) % 24;
    const minutes = Math.floor(difference / 60000) % 60;
    const seconds = Math.floor(difference / 1000) % 60;

    const patchDuration = document.getElementById(elementId);

    patchDuration.textContent =
        `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
}

function updatePatchDuration(patch) {
    const now = new Date();

    calculatePatchDuration(patch741f, now, "patch-duration");
    calculatePatchDuration(patch, now, "duration-741");
}

updatePatchDuration(patch741);
setInterval(() => updatePatchDuration(patch741), 1000);


calculatePatchDuration(patch732, patch732end, "duration-732");
calculatePatchDuration(patch739, patch739end, "duration-739");



setInterval(updateDateTime, 1000);

