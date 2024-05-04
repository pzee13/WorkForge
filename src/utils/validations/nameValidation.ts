export function validateName(name: string) {
    // Regular expression for validating usernames
    const nameRegex = /^[a-zA-Z0-9 ]{3,20}$/;

    // Check if the username matches the regex pattern
    if (!nameRegex.test(name)) {
        return false;
    }

    // If the username is valid, return null or an empty string
    return true;
}