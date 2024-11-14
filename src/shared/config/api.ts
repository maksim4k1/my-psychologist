import axios from "axios";

export const SEVER_API_URL = process.env.NEXT_PUBLIC_SERVER_API_URL;
export const BFF_API_URL = process.env.NEXT_PUBLIC_BFF_API_URL;

export const serverAxios = axios.create({
  baseURL: SEVER_API_URL,
  withCredentials: true,
});
