export default function sanitizeQuery(input: string): string {
    // Strip HTML and script tags
    let untaggedString = input.replace(/<[^>]*>/g, "");
    untaggedString = untaggedString.replace(/<script[^>]*>.*<\/script>/gi, "");

    // Escape special characters
    let escapedString = untaggedString.replace(/&/g, "&amp;");
    escapedString = escapedString.replace(/</g, "&lt;");
    escapedString = escapedString.replace(/>/g, "&gt;");
    escapedString = escapedString.replace(/"/g, "&quot;");
    escapedString = escapedString.replace(/'/g, "&#39;");

    // Standardize input
    const sanitizedString = escapedString.toLowerCase();
    return sanitizedString;
  }