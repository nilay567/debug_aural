import axios from "axios";
import { url } from "../providers/url";

export function FavouriteLevel(levelId, userId) {
  return axios.patch(`${url}/favouriteLevel/${levelId}/${userId}`);
}

export function UnFavouriteLevel(levelId, userId) {
  return axios.patch(`${url}//unfavouriteLevel/${levelId}/${userId}`);
}
