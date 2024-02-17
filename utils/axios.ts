import axios from "axios";

const serverAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONTAINER_BACKEND,
});

const storageAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_CONTAINER_STORAGE,
});

export { serverAxios, storageAxios };
