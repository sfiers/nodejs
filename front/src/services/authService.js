import http from "./httpService";
import config from "../config.json";

const apiEndPoint = `${config.apiUrl}/auth`;

export const login = (email, pwd) => {
  return http.post(apiEndPoint, {
    email,
    pwd,
  });
};
