// Shared email validation from the existing project.
export function isValidEmail(value) {
    const email = value.trim();

    if (email.length > 254) return false;

    const parts = email.split("@");
    if (parts.length !== 2) return false;

    const [local, domain] = parts;

    if (local.length === 0 || local.length > 64) return false;
    if (domain.length === 0 || domain.length > 253) return false;

    const localPattern =
        /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*$/;

    if (!localPattern.test(local)) return false;

    const labels = domain.split(".");
    if (labels.length < 2) return false;

    const labelPattern =
        /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?$/;

    if (!labels.every(label => labelPattern.test(label))) {
        return false;
    }

    return /[a-zA-Z]/.test(labels[labels.length - 1]);
}
