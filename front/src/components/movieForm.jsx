import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

import { useParams, useNavigate } from "react-router";
import { getGenres } from "../services/genreService";
import Input from "./common/input";
import Select from "./common/select";

function MovieForm({ history }) {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [numberInStock, setNumberInStock] = useState("");
  const [dailyRentalRate, setDailyRentalRate] = useState("");
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("Daily Rental Rate"),
  });

  useEffect(async () => {
    const { data } = await getGenres();
    setGenres(data);
  }, []);


  const handleChange = (e) => {
  };

  const handleSubmit = e => {
    e.preventDefault();

    // const errors = this.validate();
    // this.setState({ errors: errors || {} });
    // if (errors) return;

    this.doSubmit();
  };

  return (
    <div>
      <h1>Movie Form </h1>
      <form onSubmit={e => handleSubmit(e)}>
        <Input
          label="Title"
          value={title}
          name="title"
          onChange={(e) => {
            setTitle(e.target.value);
            handleChange(e);
          }}
          autoFocus={true}
          error={errors.title}
        />
        <Select
        name="genreId"
        value={genre}
        label="Genre"
        options={genres}
        onChange={e => {setGenre(e.target.value)}}
        error={errors["genreId"]}
        />
        <Input
          label="Number in stock"
          value={numberInStock}
          name="numberInStock"
          onChange={(e) => {
            setNumberInStock(e.target.value);
            handleChange(e);
          }}
          error={errors.numberInStock}
          type="number"
        />
        <Input
          label="Daily Rental Rate"
          value={dailyRentalRate}
          name="dailyRentalRate"
          onChange={(e) => {
            setDailyRentalRate(e.target.value);
            handleChange(e);
          }}
          error={errors.dailyRentalRate}
        />
        <button className="btn btn-primary" onClick={() => navigate("/movies ")}>
          Save
        </button>
      </form>
    </div>
  );
}

export default MovieForm;
