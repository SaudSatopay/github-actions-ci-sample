import { describe, expect, it } from "vitest";
import { slugify, truncate, wordCount } from "../src/index.js";

describe("slugify", () => {
  it("lowercases and joins words with dashes", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("strips accents", () => {
    expect(slugify("Crème Brûlée")).toBe("creme-brulee");
  });

  it("trims leading and trailing separators", () => {
    expect(slugify("  --GitHub Actions--  ")).toBe("github-actions");
  });
});

describe("wordCount", () => {
  it("counts words separated by any whitespace", () => {
    expect(wordCount("one two\tthree\nfour")).toBe(4);
  });

  it("returns 0 for empty input", () => {
    expect(wordCount("   ")).toBe(0);
  });
});

describe("truncate", () => {
  it("leaves short strings alone", () => {
    expect(truncate("short", 10)).toBe("short");
  });

  it("cuts long strings and adds an ellipsis", () => {
    expect(truncate("continuous integration", 11)).toBe("continuous…");
  });

  it("rejects a non-positive max", () => {
    expect(() => truncate("abc", 0)).toThrow(RangeError);
  });
});
