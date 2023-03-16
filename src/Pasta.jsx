import React, { useRef } from "react";

function InputComponent({ onTextChange, onDelete, defaultValue }) {
  const inputRef = useRef(null);

  const handleCopy = () => {
    const text = inputRef.current.value;
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text to copy to clipboard"
        ref={inputRef}
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
          marginTop: "10px",
          width: "50%",
        }}
        onChange={(e) => onTextChange(e.target.value)}
        onFocus={(e) => {
          e.target.select();
        }}
        defaultValue={defaultValue}
      />
      <button onClick={handleCopy}>Copy</button>
      <button onClick={onDelete}>Delete</button>
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
      <button onClick={handleAddInput}>Add Input</button>
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
