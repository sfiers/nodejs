import React, { useState } from "react";
import Counter from "./counter";

function Counters({onReset, onDelete, onIncrement, onDecrement, counters}) {
  

  return (
    <React.Fragment>
      <button onClick={onReset} className="btn btn-primary but-sm m-2">
        Reset
      </button>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          counter={counter}
          id={counter.id}
          value={counter.value}
          onDelete={onDelete}
          onIncrement={onIncrement}
          onDecrement={onDecrement}
        />
      ))}
    </React.Fragment>
  );
}

export default Counters;
