import http from "./httpService";
import config from "../config.json";

// const apiEndPoint = 'http://localhost:5000/api/movies'

export const getMovies = () => {
  return http.get(`${config.apiUrl}/movies`)
}

export const deleteMovie = (id) => {
  return http.delete(`${config.apiUrl}/movies/${id}`)
}
