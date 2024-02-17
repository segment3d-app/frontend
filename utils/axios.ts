import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER,
});

const storageAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_STORAGE,
});

export { serverAxios, storageAxios };
