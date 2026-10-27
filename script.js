import { heroes } from "./heroes.js";

if (window.location.pathname.endsWith("heroes.html")) {

const heroSections = document.querySelector("#hero-sections");
const searchInput = document.querySelector("#hero-search");
const attributeFilter = document.querySelector("#attribute-filter");
const complexityFilter = document.querySelector("#complexity-filter");
const positionFilter = document.querySelector("#position-filter");
const attackTypeFilter = document.querySelector("#attack-type-filter");

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
    document.getElementById("hero-count").textContent = heroList.length
        ? `${heroList.length} heroes found`
        : "No heroes match these filters.";

    attributes.forEach(function(attribute) {
        if (!heroList.some((hero) => hero.attribute === attribute)) return;

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

                card.appendChild(createHeroPortrait(hero));
                const caption = document.createElement("div");
                caption.className = "hero-caption";
                caption.textContent = hero.name;
                const details = document.createElement("p");
                details.className = "hero-card-info";
                details.textContent = `${hero.preferredPosition} | Complexity ${hero.complexity}/3`;
                card.append(caption, details);

                gallery.appendChild(card);
            }
        });

        heroSections.appendChild(section);
    });
}
searchInput.addEventListener("input", filterHeroes);

attributeFilter.addEventListener("change", filterHeroes);

complexityFilter.addEventListener("change", filterHeroes);
positionFilter.addEventListener("change", filterHeroes);
attackTypeFilter.addEventListener("change", filterHeroes);

renderHeroes(heroes);

function filterHeroes() {

    const searchText = searchInput.value.toLowerCase();
    const selectedAttribute = attributeFilter.value;
    const selectedComplexity = complexityFilter.value;

    const filteredHeroes = heroes.filter(function(hero) {

        const matchesSearch =
            hero.name.toLowerCase().includes(searchText);

        // Filter the hero catalog by the category selected by the user.
        let matchesAttribute;
        switch (selectedAttribute) {
            case "Strength":
                matchesAttribute = hero.attribute === "Strength";
                break;
            case "Agility":
                matchesAttribute = hero.attribute === "Agility";
                break;
            case "Intelligence":
                matchesAttribute = hero.attribute === "Intelligence";
                break;
            case "Universal":
                matchesAttribute = hero.attribute === "Universal";
                break;
            default:
                matchesAttribute = true;
        }

        const matchesComplexity =
            selectedComplexity === "All" ||
            hero.complexity === Number(selectedComplexity);

        const matchesPosition = positionFilter.value === "All" ||
            hero.positions.includes(positionFilter.value);
        const matchesAttackType = attackTypeFilter.value === "All" ||
            hero.attackType.includes(attackTypeFilter.value);

        return matchesSearch &&
               matchesAttribute &&
               matchesComplexity && matchesPosition && matchesAttackType;
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




if (document.getElementById("contact-form")) {
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


const colors = [
    "#121212",
    "#303F50",
    "#354735",
    "#503535",
    "#504530"
];
const lightColors = ["#f0f3f7", "#e3edf7", "#e5f1e4", "#f5e6e6", "#f5efdc"];



const pageMode = document.querySelector(".page-mode");
let colorIndex = 0;

if (pageMode) {
pageMode.addEventListener("click", () => {
    const palette = document.body.classList.contains("light-theme") ? lightColors : colors;
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = palette[colorIndex];
    colorIndex = (colorIndex + 1) % palette.length;
});
}




const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

let is12Hour = false;
const timeFormatButton = document.getElementById("toggle-time-format");

if (timeFormatButton) {
timeFormatButton.addEventListener("click", () => {
    is12Hour = !is12Hour;



    timeFormatButton.textContent = is12Hour ? "Switch to 24H" : "Switch to 12H";
    updateDateTime();
});
}
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

if (document.getElementById("patch-duration")) {
    updatePatchDuration(patch741);
    setInterval(() => updatePatchDuration(patch741), 1000);
    calculatePatchDuration(patch732, patch732end, "duration-732");
    calculatePatchDuration(patch739, patch739end, "duration-739");
}



if (document.getElementById("current-datetime")) {
    updateDateTime();
    setInterval(updateDateTime, 1000);
}


// Arrow navigation between menu links, with wrapping at both ends.
if (navbar) {
    const menuLinks = Array.from(navbar.querySelectorAll("a"));

    navbar.addEventListener("keydown", (event) => {
        const currentIndex = menuLinks.indexOf(document.activeElement);
        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        let direction;

        switch (event.key) {
            case "ArrowRight":
            case "ArrowDown":
                if (event.key === "ArrowDown" && !isMobile) return;
                direction = 1;
                break;
            case "ArrowLeft":
            case "ArrowUp":
                if (event.key === "ArrowUp" && !isMobile) return;
                direction = -1;
                break;
            default:
                return;
        }

        if (currentIndex === -1) return;
        event.preventDefault();
        const nextIndex = (currentIndex + direction + menuLinks.length) % menuLinks.length;
        menuLinks[nextIndex].focus();
    });
}


// One audio player prevents sounds from overlapping
const ratingSounds = {
    1: "heroes/sounds/Ui_magic_immune.mp3.mpeg",
    2: "heroes/sounds/Ui_deny_mana.mp3.mpeg",
    3: "heroes/sounds/Ui_ping_rune.mp3.mpeg",
    4: "heroes/sounds/Ui_coins.mp3.mpeg",
    5: "heroes/sounds/Ui_coins_big.mp3.mpeg"
};
const quizSounds = {
    next: "heroes/sounds/Ui_panorama_panorama_select_md_01.mp3.mpeg",
    back: "heroes/sounds/Ui_panorama_panorama_misc_click_02.mp3.mpeg",
    result: "heroes/sounds/Ui_panorama_panorama_hero_transition_01.mp3.mpeg"
};
const actionSound = new Audio();
actionSound.volume = 0.4;
let soundEnabled = true;

function playActionSound(source) {
    if (!soundEnabled || !source) return;
    actionSound.pause();
    actionSound.currentTime = 0;
    actionSound.src = source;
    actionSound.play().catch(() => {});
}

const soundToggle = document.getElementById("sound-toggle");
if (soundToggle) {
    soundToggle.addEventListener("click", () => {
        soundEnabled = !soundEnabled;
        soundToggle.textContent = soundEnabled ? "Sound: On" : "Sound: Off";
        soundToggle.setAttribute("aria-pressed", String(soundEnabled));
        if (!soundEnabled) {
            actionSound.pause();
            actionSound.currentTime = 0;
        }
    });
}


const ratingStars = document.querySelectorAll(".rating-star");
const ratingMessage = document.getElementById("rating-message");

ratingStars.forEach((star) => {
    star.addEventListener("click", () => {
        const rating = Number(star.dataset.rating);
        ratingStars.forEach((button) => {
            button.classList.toggle("selected", Number(button.dataset.rating) <= rating);
            button.setAttribute("aria-pressed", String(button === star));
        });
        ratingMessage.textContent = `Thank you! You rated this site ${rating} out of 5 stars.`;
        playActionSound(ratingSounds[rating]);
    });
});


// Shared portrait: missing local files show the hero's initials until images are added.
function createHeroPortrait(hero) {
    const portrait = document.createElement("div");
    portrait.className = "hero-portrait";
    const initials = document.createElement("span");
    initials.className = "hero-initials";
    initials.textContent = hero.name.split(/[\s-]+/).map((word) => word[0]).slice(0, 2).join("");
    initials.setAttribute("aria-hidden", "true");
    const image = document.createElement("img");
    image.alt = hero.name;
    image.loading = "lazy";
    image.addEventListener("error", () => {
        image.hidden = true;
    }, { once: true });
    image.src = hero.image;
    portrait.append(initials, image);
    return portrait;
}

// Multi-step hero quiz: position discovery and weighted recommendations.
const quiz = document.getElementById("hero-quiz");
if (quiz) {
    const steps = quiz.querySelectorAll(".quiz-step");
    const questionCount = steps.length - 1;
    const nextButton = document.getElementById("quiz-next");
    const backButton = document.getElementById("quiz-back");
    const progress = document.getElementById("quiz-progress");
    const positions = ["Carry", "Mid", "Offlane", "Soft Support", "Hard Support"];
    const styleLabels = {
        Farm: "Farming", Burst: "Burst damage", Initiate: "Initiation",
        Roam: "Roaming", Protect: "Protecting allies", Push: "Pushing"
    };

    const heroQuiz = {
        step: 0,
        answers: {},

        getPositions() {
            if (this.answers.position !== "Auto") return [this.answers.position];

            // Points follow the five positions above. Both answers contribute.
            const teamPoints = {
                Farm: [3, 1, 0, 0, 0], Burst: [1, 3, 0, 1, 0],
                Initiate: [0, 1, 3, 2, 0], Roam: [0, 2, 1, 3, 0],
                Protect: [0, 0, 1, 2, 3], Push: [2, 2, 3, 0, 0]
            };
            const lanePoints = {
                Farm: [3, 1, 0, 0, 0], Solo: [0, 3, 1, 0, 0],
                Pressure: [0, 0, 3, 1, 0], Roam: [0, 1, 0, 3, 0],
                Protect: [0, 0, 0, 1, 3]
            };
            return positions.map((position, index) => ({
                position,
                score: teamPoints[this.answers.playstyle][index] +
                    lanePoints[this.answers.earlyGame][index]
            })).filter((entry) => entry.score > 0)
                .sort((a, b) => b.score - a.score)
                .slice(0, 2).map((entry) => entry.position);
        },

        getRecommendations() {
            const preferredPositions = this.getPositions();
            let selectedAttribute;
            switch (this.answers.attribute) {
                case "Strength": selectedAttribute = "Strength"; break;
                case "Agility": selectedAttribute = "Agility"; break;
                case "Intelligence": selectedAttribute = "Intelligence"; break;
                case "Universal": selectedAttribute = "Universal"; break;
                default: selectedAttribute = null;
            }

            // A chosen position is required. Other preferences contribute points.
            const candidates = heroes.filter((hero) =>
                hero.positions.some((position) => preferredPositions.includes(position))
            );
            const recommendations = [];
            for (const hero of candidates) {
                const position = preferredPositions.find((value) => hero.positions.includes(value));
                let score = position === preferredPositions[0] ? 6 : 4;
                let maximum = 10; // Position (6 + 1 preferred) and playstyle (3).
                if (hero.preferredPosition === position) score += 1;
                const matches = [`Position: ${position}`];
                const differences = [];

                if (hero.playstyles.includes(this.answers.playstyle)) {
                    score += 3;
                    matches.push(styleLabels[this.answers.playstyle]);
                } else {
                    differences.push(`Main styles: ${hero.playstyles.map((style) => styleLabels[style]).join(", ")}`);
                }

                if (selectedAttribute) {
                    maximum += 2;
                    if (hero.attribute === selectedAttribute) {
                        score += 2;
                        matches.push(`${selectedAttribute} attribute`);
                    } else {
                        differences.push(`${hero.attribute} attribute (you chose ${selectedAttribute})`);
                    }
                }
                if (this.answers.attackType !== "Any") {
                    maximum += 2;
                    if (hero.attackType.includes(this.answers.attackType)) {
                        score += 2;
                        matches.push(`${this.answers.attackType} attacks`);
                    } else {
                        differences.push(`${hero.attackType.join(" / ")} attacks (you chose ${this.answers.attackType})`);
                    }
                }
                if (this.answers.complexity !== "Any") {
                    maximum += 3;
                    const distance = Math.abs(hero.complexity - Number(this.answers.complexity));
                    score += Math.max(0, 3 - distance * 2);
                    if (distance === 0) {
                        matches.push(`Complexity ${hero.complexity}/3`);
                    } else {
                        differences.push(`Complexity ${hero.complexity}/3 (you chose ${this.answers.complexity}/3)`);
                    }
                }
                recommendations.push({hero, score, percent: Math.round(score / maximum * 100), matches, differences});
            }
            return recommendations.sort((a, b) => b.score - a.score || a.hero.name.localeCompare(b.hero.name))
                .slice(0, 4);
        }
    };

    function readQuizAnswers() {
        heroQuiz.answers = {
            position: document.getElementById("quiz-position").value,
            playstyle: document.getElementById("quiz-playstyle").value,
            earlyGame: document.getElementById("quiz-early-game").value,
            attackType: document.getElementById("quiz-attack-type").value,
            attribute: document.getElementById("quiz-attribute").value,
            complexity: document.getElementById("quiz-complexity").value
        };
    }

    function showQuizStep(step) {
        heroQuiz.step = step;
        steps.forEach((panel, index) => {
            panel.hidden = index !== step;
        });
        progress.textContent = step < questionCount
            ? `Step ${step + 1} of ${questionCount}` : "Your recommendations";
        backButton.disabled = step === 0;
        nextButton.hidden = step === questionCount;
        nextButton.textContent = step === questionCount - 1 ? "Find my heroes" : "Next";
        steps[step].querySelector("select, h3").focus({preventScroll: true});
    }

    function renderRecommendations() {
        const suggestedPositions = heroQuiz.getPositions();
        const positionText = heroQuiz.answers.position === "Auto"
            ? `Suggested positions, in order: ${suggestedPositions.join(" / ")}. Based on your team contribution and early-game choices.`
            : `Selected position: ${suggestedPositions[0]}. Every recommendation can play this position.`;
        document.getElementById("quiz-position-result").textContent = positionText;
        const results = document.getElementById("quiz-recommendations");
        results.replaceChildren();

        heroQuiz.getRecommendations().forEach((match) => {
            const hero = match.hero;
            const card = document.createElement("article");
            card.className = "quiz-match";
            const name = document.createElement("h4");
            name.textContent = hero.name;
            const score = document.createElement("p");
            score.className = "quiz-match-score";
            score.textContent = `${match.percent}% preference match`;
            const details = document.createElement("p");
            details.textContent = `${hero.attribute} | ${hero.attackType.join(" / ")} | Complexity ${hero.complexity}/3`;
            const position = document.createElement("p");
            position.textContent = `Preferred: ${hero.preferredPosition}. Positions: ${hero.positions.join(", ")}.`;
            const roles = document.createElement("p");
            roles.className = "quiz-match-roles";
            roles.textContent = `Roles: ${hero.roles.join(", ")}`;
            const reasons = document.createElement("p");
            reasons.className = "quiz-match-reasons";
            reasons.textContent = `Matches: ${match.matches.join("; ")}.`;
            card.append(name, createHeroPortrait(hero), score, details, position, roles, reasons);
            if (match.differences.length) {
                const differences = document.createElement("p");
                differences.className = "quiz-match-differences";
                differences.textContent = `Other preferences: ${match.differences.join("; ")}.`;
                card.appendChild(differences);
            }
            results.appendChild(card);
        });
    }

    nextButton.addEventListener("click", () => {
        // Validate every field on this step; previous selections remain in the DOM.
        for (const input of steps[heroQuiz.step].querySelectorAll("select")) {
            if (!input.reportValidity()) return;
        }
        readQuizAnswers();
        if (heroQuiz.step === questionCount - 1) renderRecommendations();
        showQuizStep(heroQuiz.step + 1);
        playActionSound(heroQuiz.step === questionCount ? quizSounds.result : quizSounds.next);
    });

    backButton.addEventListener("click", () => {
        showQuizStep(heroQuiz.step - 1);
        playActionSound(quizSounds.back);
    });
}


// Assignment 5: Day / Night theme, shared by every page.
const themeButtons = document.querySelectorAll(".theme-toggle");

function applyTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);

    // Let theme variables control the background after a manual color change.
    document.body.style.removeProperty("background-color");
    document.body.style.removeProperty("background-image");
    colorIndex = 0;

    themeButtons.forEach((button) => {
        button.textContent = isLight ? "Theme: Light" : "Theme: Dark";
        button.setAttribute("aria-pressed", String(isLight));
        button.title = isLight ? "Switch to dark theme" : "Switch to light theme";
    });
}

let savedTheme = "dark";
try {
    savedTheme = localStorage.getItem("dota-wiki-theme") || "dark";
} catch {
    // Theme switching still works when browser storage is unavailable.
}
applyTheme(savedTheme);

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const theme = document.body.classList.contains("light-theme") ? "dark" : "light";
        applyTheme(theme);
        try {
            localStorage.setItem("dota-wiki-theme", theme);
        } catch {
            // The current page can use the selected theme without saving it.
        }
    });
});
