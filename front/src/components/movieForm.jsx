import React from "react";
import { useParams, useNavigate } from "react-router";

function MovieForm({ history }) {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div>
      <div>MovieForm {id} </div>
      <button className="btn btn-primary" onClick={() => navigate("/movies ")}>
        Save
      </button>
    </div>
  );
}

export default MovieForm;
