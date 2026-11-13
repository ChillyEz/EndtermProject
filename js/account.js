import { heroes } from "../heroes.js";
import { isValidEmail } from "./validation.js";

// A browser-only account simulation. It is not server-side authentication.
const usersKey = "dota-wiki-users-v1";
const sessionKey = "dota-wiki-current-user";

function readUsers() {
    const users = JSON.parse(localStorage.getItem(usersKey) || "[]");
    if (!Array.isArray(users) || users.some((user) => !user ||
        typeof user.email !== "string" || typeof user.name !== "string" ||
        typeof user.passwordHash !== "string" || typeof user.salt !== "string" ||
        !Array.isArray(user.favorites))) {
        throw new Error("Invalid account storage");
    }
    return users;
}

function currentUser() {
    return readUsers().find((user) => user.email === localStorage.getItem(sessionKey));
}

// Store a salted password hash, never the original password. HTTPS or localhost is required.
async function hashPassword(password, salt) {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({
        name: "PBKDF2", salt: encoder.encode(salt), iterations: 100000, hash: "SHA-256"
    }, key, 256);
    return Array.from(new Uint8Array(bits), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function passwordError(password) {
    return password.length < 8 || !/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/\d/.test(password)
        ? "Use at least 8 characters, including uppercase, lowercase and a number." : "";
}

function showErrors($form, errors) {
    $form.find(".field-error").remove();
    $form.find("[aria-invalid]").removeAttr("aria-invalid aria-errormessage");
    for (const [id, message] of Object.entries(errors)) {
        const $input = $form.find(`#${id}`);
        $input.attr({ "aria-invalid": "true", "aria-errormessage": `${id}-error` });
        const $error = $("<span>").addClass("field-error").attr("id", `${id}-error`).text(message);
        ($input.is(":checkbox") ? $input.closest("label") : $input).after($error);
    }
    $form.find(".auth-status").text(Object.keys(errors).length ? "Please check the highlighted fields." : "");
    $form.find('[aria-invalid="true"]').first().trigger("focus");
}

function setBusy($form, busy) {
    $form.attr("aria-busy", String(busy));
    $form.find("button[type='submit']").prop("disabled", busy);
}

export function createSaveHeroButton(hero) {
    let saved = false;
    try { saved = currentUser()?.favorites.includes(hero.name) || false; } catch { /* Show storage errors on click. */ }
    return $("<button>").addClass("save-hero").attr({
        type: "button", "data-hero": hero.name, "aria-pressed": String(saved),
        "aria-label": `${saved ? "Remove" : "Save"} ${hero.name} ${saved ? "from" : "to"} my hero pool`
    }).text(saved ? "✓ In my pool" : "+ Save hero");
}

function renderProfile() {
    if (!$("#profile-page").length) return;
    try {
        const user = currentUser();
        if (!user) {
            location.replace("login.html");
            return;
        }
        $("#profile-content").prop("hidden", false);
        $("#profile-name").text(user.name);
        $("#profile-email").text(user.email);
        $("#profile-phone").text(user.phone);
        $("#profile-avatar").text(user.name.slice(0, 2).toUpperCase());
        const pool = heroes.filter((hero) => user.favorites.includes(hero.name));
        $("#pool-count").text(pool.length);
        $("#pool-empty").prop("hidden", pool.length > 0);
        const $pool = $("#saved-heroes").empty();
        for (const hero of pool) {
            $pool.append($("<article>").addClass("pool-card").append(
                $("<img>").attr({ src: hero.image, alt: hero.name }),
                $("<div>").append($("<h3>").text(hero.name),
                    $("<p>").text(`${hero.preferredPosition} · Complexity ${hero.complexity}/3`)),
                createSaveHeroButton(hero)
            ));
        }
        const $coverage = $("#pool-positions").empty();
        ["Carry", "Mid", "Offlane", "Soft Support", "Hard Support"].forEach((position) => {
            const count = pool.filter((hero) => hero.positions.includes(position)).length;
            $coverage.append($("<li>").toggleClass("covered", count > 0).append(
                $("<span>").text(position), $("<strong>").text(count ? `${count} available` : "Not covered")
            ));
        });
        $(document).trigger("pagecontentchange");
    } catch {
        $("#profile-status").text("Your account could not be read. Enable browser storage and try again.");
    }
}

export function initAccount() {
    try {
        if (currentUser()) {
            $(".register-link").attr("href", "profile.html").text("My profile")
                .toggleClass("active", Boolean($("#profile-page").length))
                .removeAttr("aria-current");
            if ($("#profile-page").length) $(".register-link").attr("aria-current", "page");
        }
    } catch { /* Public pages still work when browser storage is disabled. */ }

    $("#registration-form").on("submit", async function (event) {
        event.preventDefault();
        const $form = $(this);
        if ($form.attr("aria-busy") === "true") return;
        const name = $("#username").val().trim();
        const email = $("#email").val().trim().toLowerCase();
        const phone = $("#phone").val().trim();
        const password = $("#password").val(); // Do not silently trim a password.
        const errors = {};
        if (!/^[a-zA-Z][a-zA-Z0-9_]{2,29}$/.test(name)) errors.username = "Use 3–30 letters, digits or underscores, starting with a letter.";
        if (!isValidEmail(email)) errors.email = "Enter a valid email address.";
        if (!/^\+[1-9][0-9 ()-]*$/.test(phone) || !/^\d{10,15}$/.test(phone.replace(/\D/g, ""))) {
            errors.phone = "Use a country code and 10–15 digits, for example +7 700 123 4567.";
        }
        if (passwordError(password)) errors.password = passwordError(password);
        if (!$("#confirm-password").val() || password !== $("#confirm-password").val()) errors["confirm-password"] = "The passwords must match.";
        if (!$("#termsCons").prop("checked")) errors.termsCons = "Please acknowledge that this is a local demo account.";
        showErrors($form, errors);
        if (Object.keys(errors).length) return;
        setBusy($form, true);
        try {
            if (readUsers().some((user) => user.email === email)) {
                showErrors($form, { email: "This email is already registered. Log in instead." });
                return;
            }
            const salt = Array.from(crypto.getRandomValues(new Uint8Array(16))).join("-");
            const passwordHash = await hashPassword(password, salt);
            const users = readUsers(); // Re-read after the asynchronous hash calculation.
            if (users.some((user) => user.email === email)) {
                showErrors($form, { email: "This email is already registered. Log in instead." });
                return;
            }
            users.push({ name, email, phone, passwordHash, salt, favorites: [] });
            localStorage.setItem(usersKey, JSON.stringify(users));
            location.href = "login.html?registered=1";
        } catch {
            $form.find(".auth-status").text("Could not save your account. Enable browser storage and open the site over HTTPS or localhost.");
        } finally { setBusy($form, false); }
    });

    if (new URLSearchParams(location.search).get("registered") === "1") {
        $("#login-status").text("Account created. Log in with your new details.");
    }
    $("#login-form").on("submit", async function (event) {
        event.preventDefault();
        const $form = $(this);
        if ($form.attr("aria-busy") === "true") return;
        const email = $("#login-email").val().trim().toLowerCase();
        const password = $("#login-password").val();
        const errors = {};
        if (!isValidEmail(email)) errors["login-email"] = "Enter a valid email address.";
        if (passwordError(password)) errors["login-password"] = passwordError(password);
        showErrors($form, errors);
        if (Object.keys(errors).length) return;
        setBusy($form, true);
        try {
            const user = readUsers().find((entry) => entry.email === email);
            if (!user || await hashPassword(password, user.salt) !== user.passwordHash) {
                $("#login-status").text("Email or password is incorrect. Please try again.");
                return;
            }
            localStorage.setItem(sessionKey, user.email);
            location.href = "profile.html";
        } catch {
            $("#login-status").text("Login is unavailable. Enable browser storage and use HTTPS or localhost.");
        } finally { setBusy($form, false); }
    });

    $(document).on("click", ".save-hero", function () {
        const heroName = $(this).attr("data-hero");
        if (!heroes.some((hero) => hero.name === heroName)) return;
        try {
            const users = readUsers();
            const user = users.find((entry) => entry.email === localStorage.getItem(sessionKey));
            if (!user) { location.href = "login.html"; return; }
            const saved = user.favorites.includes(heroName);
            user.favorites = saved ? user.favorites.filter((name) => name !== heroName) : [...user.favorites, heroName];
            localStorage.setItem(usersKey, JSON.stringify(users));
            // Update every copy, including recommendation cards, without losing keyboard focus.
            $(".save-hero").filter((_, button) => button.dataset.hero === heroName)
                .attr({ "aria-pressed": String(!saved), "aria-label": `${saved ? "Save" : "Remove"} ${heroName} ${saved ? "to" : "from"} my hero pool` })
                .text(saved ? "+ Save hero" : "✓ In my pool");
            $("#account-feedback").text(`${heroName} ${saved ? "removed from" : "added to"} your hero pool.`);
            const wasProfile = Boolean($("#profile-page").length);
            renderProfile();
            if (wasProfile) $("#pool-title").trigger("focus");
        } catch { $("#account-feedback").text("Your change could not be saved. Check browser storage."); }
    });

    $("#logout").on("click", () => {
        try { localStorage.removeItem(sessionKey); location.href = "login.html"; }
        catch { $("#profile-status").text("Could not log out. Check browser storage."); }
    });
    // Keep the profile and saved states consistent when another tab changes the account.
    $(window).on("storage", (event) => {
        if ([usersKey, sessionKey, null].includes(event.originalEvent.key)) location.reload();
    });
    $(window).on("pageshow", (event) => {
        if (event.originalEvent.persisted) location.reload();
    });
    renderProfile();
}
