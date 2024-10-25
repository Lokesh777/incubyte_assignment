import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = () => {
    try {
      setError(null); // Reset error before each calculation
      const sum = add(input);
      setResult(sum);
    } catch (e) {
      setError(e.message);
      setResult(null); // Reset result in case of error
    }
  };

  return (
    <div className="App">
      <h1>String Calculator</h1>
      <input
        type="text"
        placeholder="Enter numbers"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleCalculate}>Calculate Sum</button>
      {error && <p className="error">{error}</p>}
      {result !== null && !error && <p className="result">Result: {result}</p>}
    </div>
  );
}
export function add(numbers) {
  if (!numbers) return 0;

  // Check for custom delimiter
  const delimiterPattern = /^\/\/(.+)\n/;
  let delimiter = /[,\n]/; // Default delimiters are comma and newline

  if (delimiterPattern.test(numbers)) {
    const match = numbers.match(delimiterPattern);
    delimiter = new RegExp(match[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // Escape special regex chars
    numbers = numbers.replace(delimiterPattern, ""); // Remove delimiter specifier
  }

  // Split by delimiter(s) and convert to numbers
  const numArray = numbers.split(delimiter).map((num) => Number(num.trim()));
  const negatives = numArray.filter((num) => num < 0);

  // Check for negative numbers
  if (negatives.length) {
    throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
  }

  // Return sum of numbers
  return numArray.reduce((sum, num) => sum + num, 0);
}
