import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatTime,
  slugify,
  getInitials,
  calculateAge,
  truncate,
} from "@/lib/utils";

describe("Utility Functions", () => {
  describe("formatCurrency", () => {
    it("formats USD currency correctly", () => {
      expect(formatCurrency(1500)).toBe("$1,500");
      expect(formatCurrency(99.99)).toBe("$99.99");
      expect(formatCurrency(0)).toBe("$0");
    });

    it("handles string input", () => {
      expect(formatCurrency("2500")).toBe("$2,500");
    });
  });

  describe("formatTime", () => {
    it("formats time correctly", () => {
      expect(formatTime("09:00")).toBe("9:00 AM");
      expect(formatTime("13:30")).toBe("1:30 PM");
      expect(formatTime("00:00")).toBe("12:00 AM");
      expect(formatTime("12:00")).toBe("12:00 PM");
    });
  });

  describe("slugify", () => {
    it("creates valid slugs", () => {
      expect(slugify("Hello World")).toBe("hello-world");
      expect(slugify("Teeth Whitening!")).toBe("teeth-whitening");
      expect(slugify("  Multiple   Spaces  ")).toBe("multiple-spaces");
    });
  });

  describe("getInitials", () => {
    it("returns correct initials", () => {
      expect(getInitials("John Doe")).toBe("JD");
      expect(getInitials("Sarah Jane Mitchell")).toBe("SJ");
      expect(getInitials("Alice")).toBe("A");
    });
  });

  describe("truncate", () => {
    it("truncates long strings", () => {
      expect(truncate("Hello World", 5)).toBe("Hello...");
      expect(truncate("Hi", 10)).toBe("Hi");
    });
  });

  describe("calculateAge", () => {
    it("calculates age correctly", () => {
      const birthDate = new Date("1990-06-15");
      const age = calculateAge(birthDate);
      expect(age).toBeGreaterThanOrEqual(34);
      expect(age).toBeLessThanOrEqual(36);
    });
  });
});
