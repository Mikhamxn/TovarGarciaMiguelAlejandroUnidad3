import axios from "axios";

const strBaseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export const clienteHttp = axios.create({
  baseURL: strBaseUrl,
  headers: {
    "Content-Type": "application/json"
  }
});

clienteHttp.interceptors.request.use((config) => {
  const strToken = localStorage.getItem("strTokenJwt");
  if (strToken) {
    config.headers.Authorization = `Bearer ${strToken}`;
  }
  return config;
});
