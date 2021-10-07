import React from "react";
import "./InputTxt.css";

function InputTxt({ placeholder, changeTxt, value }) {
  return (
    <div className="inputContainer">
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        onChange={changeTxt}
        value={value}
      ></input>
    </div>
  );
}

export default InputTxt;
