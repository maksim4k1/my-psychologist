import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const customAxios = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
