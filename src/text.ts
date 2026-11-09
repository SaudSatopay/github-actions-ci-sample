/** Turn any string into a URL-friendly slug: "Hello, World!" -> "hello-world". */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Count the words in a string. Empty or whitespace-only input has 0 words. */
export function wordCount(input: string): number {
  const trimmed = input.trim();
  return trimmed === "" ? 0 : trimmed.split(/\s+/).length;
}

/** Shorten a string to at most `max` characters, ending with "…" when cut. */
export function truncate(input: string, max: number): string {
  if (!Number.isInteger(max) || max < 1) {
    throw new RangeError("max must be a positive integer");
  }
  if (input.length <= max) return input;
  return `${input.slice(0, max - 1).trimEnd()}…`;
}
