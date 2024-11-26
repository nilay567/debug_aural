import axios from "axios";
import { url } from "../providers/url";

export function getUserID(id) {
  return axios.get(`${url}/StudentById/${id}`);
}
