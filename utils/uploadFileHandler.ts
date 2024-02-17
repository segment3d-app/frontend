import axios from "axios";

export default async function UploadFileHandler(
  folder: string,
  file: File | File[] | undefined | null,
  multiple: boolean = false,
) {
  if (!file) {
    return { error: "file is missing", url: null, message: null };
  }
  const form = new FormData();
  form.append("folder", folder);
  if (!multiple) {
    form.append("file", file as File);
  } else {
    const newFile = file as File[];
    for (let i = 0; i < newFile.length; i++) {
      form.append("file", newFile[i]);
    }
  }

  try {
    const {
      data: { url, message },
    } = await axios.post("/api/media", form);
    return { error: null, url: url, message: message };
  } catch (err: any) {
    return {
      error: err?.response?.data?.error ?? "upload file error",
      url: null,
      message: null,
    };
  }
}
