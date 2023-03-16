import React from "react";
import "./App.css";
import Pasta from "./Pasta";

export default function App() {
  return (
    <div className="App">
      <h1>
        Copy Pasta <span style={{ fontSize: 18 }}>by Michael Simon</span>
      </h1>
      <ol>
        <li>Enter some text</li>
        <li>Click the copy to copy text</li>
        <li>Click the delete to delete the input</li>
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
