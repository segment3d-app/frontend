import { clientAxios } from "./axios";

export default async function UploadFileHandler(file: File) {
  const form = new FormData();
  form.append("file", file);

  try {
    const {
      data: { url },
    } = await clientAxios.post("/api/media", form);
    return { error: null, url: url };
  } catch (error) {
    return { error: "", url: null };
  }
}
