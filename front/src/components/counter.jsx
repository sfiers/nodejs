import React, { useState } from "react";

function Counter({ id, counter, value, onDelete, onIncrement, onDecrement }) {
  // const [count, setCount] = useState(value);

  function getBadgeClasses() {
    let classes = "badge m-2 bg-";
    classes += value === 0 ? "warning" : "primary";
    return classes;
  }

  function formatCounter() {
    return value === 0 ? "Zero" : value;
  }

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-1">
          <div className={getBadgeClasses()}>{formatCounter()}</div>
        </div>
        <div className="col">
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onIncrement(counter)}
          >
            +
          </button>
          <button
            className="btn btn-secondary btn-sm m-2"
            onClick={() => onDecrement(counter)}
            disabled={value === 0 ? 'disabled' : ""}
          >
            -
          </button>
          <button
            onClick={() => onDelete(id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Counter;
