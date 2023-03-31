import axios from "axios";

export function registerUser(name, email, phone, password) {
  return axios.post("http://localhost:8000/api/User", { name, email, phone, password });
}

export function loginUser(email, password) {
  return axios.post("http://localhost:8000/api/login", { email, password });
}
