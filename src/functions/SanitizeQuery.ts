export default function sanitizeQuery(input: string): string {
    return encodeURIComponent(input).toLowerCase();
}
