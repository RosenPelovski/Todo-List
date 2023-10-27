import React, { useState } from "react";
import "./InputField.css";
const InputField = (props) => {
  let {
    placeholder = "Enter text here",
    buttonLabel = "Submit",
    submit = () => { },
    clearOnSubmit = false,
  } = props;
  const [text, setText] = useState("");
  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(text);
    if (clearOnSubmit) {
      setText("");
    }

  };
  return (
    <form className="input-group" onSubmit={handleSubmit}>
      <input
        type="text"
        name="todo"
        value={text}
        className="todo-input"
        placeholder={placeholder}
        onChange={handleChange}
      />
      <button className="input-button" onClick={handleSubmit}>
        {buttonLabel}
      </button>
    </form>
  );
};

export default InputField;
