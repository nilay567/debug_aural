import axios from "axios";
import { url } from "../providers/url";
export function allCourses() {
  return axios.get(`${url}/getCourse`);
}

export function SubscribeToCourse(courseId, userId) {
  return axios.get(`${url}/subscribeCourse/${courseId}/${userId}`);
}

export function UnSubscribeCourse(courseId, userId) {
  return axios.get(`${url}/unsubscribeCourse/${courseId}/${userId}`);
}
