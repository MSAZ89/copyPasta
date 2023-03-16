import React from "react";
import "./App.css";
import Pasta from "./Pasta";

export default function App() {
  return (
    <div className="App">
      <h1>
        Copy Pasta{" "}
        <span style={{ fontSize: 18 }}>
          by{" "}
          <a target="_blank" href="https://www.michaelsimonaz.com/">
            Michael Simon
          </a>
        </span>
      </h1>
      <ol>
        <li>Enter some text</li>
        <li>Click copy to copy text</li>
        <li>Click delete to delete the input</li>
        <li>Click "add input" to add a new input</li>
        <li>
          Fields and values are automatically updated in URL parameters for easy
          sharing
        </li>
      </ol>
      <Pasta />
    </div>
  );
}
