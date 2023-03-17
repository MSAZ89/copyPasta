import React, { useRef } from "react";

function InputComponent({ onTextChange, onDelete, defaultValue }) {
  const inputRef = useRef(null);

  const handleCopy = () => {
    const text = inputRef.current.value;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="my-2">
      <button
        title="Copy to clipboard"
        className="border-2 border-green-500 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none focus:border-green-700 hover:bg-green-100 transition-all duration-200"
        style={{ margin: 4 }}
        onClick={handleCopy}
      >
        Copy
      </button>
      <input
        className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none focus:bg-slate-300 focus:h-12 transition-all duration-400"
        type="text"
        placeholder="Enter text to copy to clipboard"
        ref={inputRef}
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: "10px",
          width: "80%",
        }}
        onChange={(e) => onTextChange(e.target.value)}
        onFocus={(e) => {
          e.target.select();
        }}
        defaultValue={defaultValue}
      />
      <button
        title="Delete"
        className="border-2 border-red-300 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none"
        style={{ margin: 4 }}
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
}

export default function Pasta() {
  const [inputs, setInputs] = React.useState(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const numInputs = Number(searchParams.get("numInputs")) || 1;
    const inputValues = searchParams.getAll("inputValue");
    const inputs = [];

    for (let i = 0; i < numInputs; i++) {
      inputs.push({ id: i + 1, text: inputValues[i] || "" });
    }

    return inputs;
  });

  const handleAddInput = () => {
    const inputValue = "default value"; // Replace with input field value
    const numInputs = inputs.length + 1;

    const newInputs = [...inputs, { id: Date.now(), text: inputValue }];
    setInputs(newInputs);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("inputValue", inputValue);
    searchParams.set("numInputs", numInputs.toString());
    const newUrl = window.location.pathname + "?" + searchParams.toString();
    window.history.pushState({}, "", newUrl);
  };

  const handleDeleteInput = (idToDelete) => {
    setInputs((prevInputs) =>
      prevInputs.filter((input) => input.id !== idToDelete)
    );
  };

  const handleTextChange = (idToUpdate, newText) => {
    setInputs((prevInputs) =>
      prevInputs.map((input) =>
        input.id === idToUpdate ? { ...input, text: newText } : input
      )
    );
  };

  React.useEffect(() => {
    const searchParams = new URLSearchParams();

    inputs.forEach((input) => {
      searchParams.append("inputValue", input.text);
    });

    searchParams.set("numInputs", inputs.length);

    window.history.replaceState(null, "", `?${searchParams.toString()}`);
  }, [inputs]);

  return (
    <div className="App">
      <title>{inputs[0].text} - Copy Pasta</title>
      <button
        className="border-2 my-4 border-gray-300 bg-white h-10 px-4 rounded-lg text-sm focus:outline-none focus:border-green-700 hover:bg-green-100"
        onClick={handleAddInput}
      >
        Add Input
      </button>
      {inputs.map((input) => (
        <div key={input.id}>
          <InputComponent
            defaultValue={input.text}
            onTextChange={(newText) => handleTextChange(input.id, newText)}
            onDelete={() => handleDeleteInput(input.id)}
          />
        </div>
      ))}
    </div>
  );
}
