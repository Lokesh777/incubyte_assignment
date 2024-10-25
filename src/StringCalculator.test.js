import { add } from "./App";

describe("String Calculator", () => {
  test("returns 0 for an empty string", () => {
    expect(add("")).toBe(0);
  });

  test("returns the number itself when one number is provided", () => {
    expect(add("1")).toBe(1);
  });

  test("returns the sum of two numbers separated by a comma", () => {
    expect(add("1,5")).toBe(6);
  });

  test("handles an unknown number of comma-separated numbers", () => {
    expect(add("1,2,3,4")).toBe(10);
  });

  test("handles new lines as separators", () => {
    expect(add("1\n2,3")).toBe(6);
  });

  test("supports a custom delimiter", () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  test("throws an error with a message for negative numbers", () => {
    expect(() => add("1,-2,3")).toThrow("Negative numbers not allowed: -2");
  });

  test("throws an error with a message for multiple negative numbers", () => {
    expect(() => add("1,-2,-3")).toThrow(
      "Negative numbers not allowed: -2, -3"
    );
  });
});
