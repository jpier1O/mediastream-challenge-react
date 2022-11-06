import axios from "axios";
import { ENDPOINT } from "../utils";

const api = axios.create({
  baseURL: ENDPOINT
})

export default api;