const calculateSum = (input) => {
  if (input.trim() === "") return 0;

  let delimiterPattern = /,|\n/; // Default delimiters: comma or newline

  // Check if custom delimiters are defined
  if (input.startsWith("//")) {
    const delimiterHeaderEnd = input.indexOf("\n");
    const customDelimiterSection = input.substring(2, delimiterHeaderEnd);

    // Handle single or multiple custom delimiters
    const delimiterMatches = customDelimiterSection.match(/\[.*?\]/g);
    const delimiters = delimiterMatches
      ? delimiterMatches.map((del) => del.slice(1, -1))
      : [customDelimiterSection];

    // Build a regex pattern for all custom delimiters
    delimiterPattern = new RegExp(
      delimiters.map((d) => escapeRegex(d)).join("|")
    );
    input = input.slice(delimiterHeaderEnd + 1);
  }

  // Split the input string by the resolved delimiters
  const numList = input.split(delimiterPattern).map(Number);
  const negatives = numList.filter((num) => num < 0);

  if (negatives.length > 0) {
    throw new Error(`Negatives not allowed: ${negatives.join(", ")}`);
  }

  // Sum numbers, ignoring values greater than 1000
  return numList
    .filter((num) => num <= 1000)
    .reduce((total, current) => total + current, 0);
};

// Helper function to escape special characters in regex
function escapeRegex(delimiter) {
  return delimiter.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

module.exports = { calculateSum };
