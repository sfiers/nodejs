import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Counters from "./components/counters";
import NavBar2 from "./components/navBar2";
import NavBar from "./components/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import jwtDecode from "jwt-decode";
import "./App.css";
import { set } from "lodash";
import Logout from "./components/common/logout";

function App() {
  const [counters, setCounters] = useState([
    { id: 1, value: 0 },
    { id: 2, value: 0 },
    { id: 3, value: 0 },
    { id: 4, value: 0 },
  ]);

  const [jwt, setJwt] = useState({});

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      console.log(user)
      setJwt(user)
    } catch (ex) {}
  }, []);

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
  return (
    <React.Fragment>
      {/* <NavBar2 /> */}
      {/* <Movies /> */}
      <NavBar2 jwt={jwt} />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate replace to="/movies" />} />
          <Route
            path="/"
            element={
              <>
                <Outlet />
              </>
            }
          >
            <Route path="/login" element={<LoginForm />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/movies/:id" element={<MovieForm />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/not-found" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </React.Fragment>
  );

  {
    /* <NavBar numberOfCounters={counters.filter(c => c.value !== 0).length}/>
    <Counters onDelete={handleDelete} onReset={handleReset} onIncrement={handleIncrement} onDecrement={handleDecrement} counters={counters}/> */
  }
}

export default App;
