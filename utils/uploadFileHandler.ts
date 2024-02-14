import { clientAxios } from "./axios";

export default async function UploadFileHandler(
  folder: string,
  file: File | undefined | null,
) {
  if (!file) {
    return { error: "file is missing", url: null, message: null };
  }
  const form = new FormData();
  form.append("folder", folder);
  form.append("file", file);

  try {
    const {
      data: { url, message },
    } = await clientAxios.post("/api/media", form);
    return { error: null, url: url, message: message };
  } catch (err: any) {
    return {
      error: err?.response?.data?.error ?? "upload file error",
      url: null,
      message: null,
    };
  }
}
