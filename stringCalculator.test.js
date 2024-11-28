const { calculateSum } = require("./stringCalculator");

describe("String Calculator", () => {
  test("It should return 0 for an empty string", () => {
    expect(calculateSum("")).toBe(0);
  });

  test("It should return the value for a single number", () => {
    expect(calculateSum("1")).toBe(1);
  });

  test(" It should add two numbers separated by a comma", () => {
    expect(calculateSum("1,2")).toBe(3);
  });

  test("It should handle multiple numbers separated by commas", () => {
    expect(calculateSum("1,2,3,4")).toBe(10);
  });

  test("It should allow newlines as delimiters", () => {
    expect(calculateSum("1\n2,3")).toBe(6);
  });

  test("It should support custom delimiters", () => {
    expect(calculateSum("//;\n1;2;3")).toBe(6);
  });

  test("It should throw an error for negative numbers", () => {
    expect(() => calculateSum("1,-2,3")).toThrow("Negatives not allowed: -2");
  });

  test("It should list all negative numbers in the error message", () => {
    expect(() => calculateSum("-1,-2,-3")).toThrow(
      "Negatives not allowed: -1, -2, -3"
    );
  });

  test("It should ignore numbers which are  greater than 1000", () => {
    expect(calculateSum("2,1001,3")).toBe(5);
  });

  test("It should support custom delimiters of variable length", () => {
    expect(calculateSum("//[***]\n1***2***3")).toBe(6);
  });

  test("It should allow diffrent custom delimiters", () => {
    expect(calculateSum("//[*][%]\n1*2%3")).toBe(6);
  });

  test("It should handle multiple custom delimiters of any lengths", () => {
    expect(calculateSum("//[###][@@]\n1###2@@3")).toBe(6);
  });
});
