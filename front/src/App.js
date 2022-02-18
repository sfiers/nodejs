import "./App.css";
import React, {useState} from "react";
import Counters from "./components/counters";
import NavBar from "./components/navBar";
import Movies from "./components/movies";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const handleDelete = (id) => {
    setCounters(counters.filter((c) => c.id !== id));
  };


  const handleIncrement = (counter) => {
    const tempCounters = [...counters];
    // bug pas une bonne techinque counter.id -1 quand on delete un truc
    tempCounters[counter.id - 1] = { ...counters[counter.id - 1] };
    tempCounters[counter.id - 1].value++;
    setCounters([...tempCounters]);
  };

  const handleDecrement = (counter) => {
    const tempCounters = [...counters];
    tempCounters[counter.id - 1] = { ...counters[counter.id - 1] };
    tempCounters[counter.id - 1].value--;
    setCounters([...tempCounters]);
  };

  const handleReset = () => {
    setCounters(
      counters.map((c) => {
        c.value = 0;
        return c;
      })
    );
  };
  return <main className="container">
    <Movies />
    {/* <NavBar numberOfCounters={counters.filter(c => c.value !== 0).length}/>
    <Counters onDelete={handleDelete} onReset={handleReset} onIncrement={handleIncrement} onDecrement={handleDecrement} counters={counters}/> */}
  </main>;
}

export default App;
