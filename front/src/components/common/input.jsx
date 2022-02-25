import React from "react";

function Input({name, label, value, onChange, autoFocus, error, type = "text"}) {
  return (
    <div className="mb-3">
      <label htmlFor="username">{label}</label>
      <input
        value={value}
        autoFocus={autoFocus ? "autoFocus" : ""}
        id={name}
        type={type}
        className="form-control"
        onChange={onChange}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;