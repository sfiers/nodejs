import http from "./httpService";
import  config  from "../config.json";

export const getGenres = () => {
  return http.get(`${config.apiUrl}/genres`);
};

// export getGenres;
