import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

const clientAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_CLIENT,
});

export { serverAxios, clientAxios };
