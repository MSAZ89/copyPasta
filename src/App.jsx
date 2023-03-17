import React from "react";
import "./App.css";
import Pasta from "./Pasta";

export default function App() {
  return (
    <div className="container mx-auto my-4 bg-slate-100 p-16">
      <h1 className="text-4xl my-4 tracking-tighter">
        Copy Pasta{" "}
        <span className="font-light tracking-wide" style={{ fontSize: 18 }}>
          by{" "}
          <a target="_blank" href="https://www.michaelsimonaz.com/">
            Michael Simon
          </a>
        </span>
      </h1>
      <Pasta />

      <div className="my-8">
        <details>
          <summary>Info</summary>
          <ol className="my-4 list-disc text-sm">
            <li>Enter some text</li>
            <li>Click copy to copy input text</li>
            <li>Click delete to delete an input</li>
            <li>Click "add input" to add a new input</li>
            <li>
              Fields and values are automatically updated in URL parameters for
              easy sharing
            </li>
          </ol>
          <p className="font-light mb-4 text-lg">
            No data is collected on this page in any form, only URL params. This
            is a simple tool to copy text to clipboard easily.
          </p>
        </details>
      </div>
    </div>
  );
}
