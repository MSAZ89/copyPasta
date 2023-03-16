import React, { useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";

function InputComponent({ onTextChange, onDelete }) {
  const inputRef = useRef(null);

  const handleCopy = () => {
    const text = inputRef.current.value;
    navigator.clipboard.writeText(text);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter text to copy to clipboard."
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
      />
      <button onClick={handleCopy}>Copy</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

function MainPasta() {
  const [inputs, setInputs] = React.useState([]);

  const handleAddInput = () => {
    setInputs((prevInputs) => [...prevInputs, { id: Date.now(), text: "" }]);
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

  return (
    <div className="App">
      <button onClick={handleAddInput}>Add Input</button>
      {inputs.map((input) => (
        <div key={input.id}>
          <InputComponent
            onTextChange={(newText) => handleTextChange(input.id, newText)}
            onDelete={() => handleDeleteInput(input.id)}
          />
        </div>
      ))}
    </div>
  );
}

export default MainPasta;
