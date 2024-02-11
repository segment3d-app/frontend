import { Storage } from "@google-cloud/storage";
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";

interface FormidableFile extends formidable.File {
  [x: string]: any;
}

interface FormData {
  folder: string;
  file: FormidableFile;
}

const getEnv = () => {
  if (
    !process.env.PROJECT_ID ||
    !process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    !process.env.BUCKET_NAME
  ) {
    throw new Error("Environment variables are not set correctly.");
  }
  return {
    projectId: process.env.PROJECT_ID,
    credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS),
    bucketName: process.env.BUCKET_NAME,
  };
};

const { projectId, credentials, bucketName } = getEnv();

const storage = new Storage({
  projectId,
  credentials,
});

const bucket = storage.bucket(bucketName);

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data: FormData = await new Promise((resolve, reject) => {
      const form = new formidable.IncomingForm();
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({
          folder: fields.folder as unknown as string,
          file: files.file as unknown as FormidableFile,
        });
      });
    });

    const { folder, file } = data;
    const filePath = `${folder}/${file.originalFilename}-${new Date().toISOString()}`;
    const blob = bucket.file(filePath);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", (err) => {
      console.error("Stream error:", err);
      res
        .status(500)
        .json({ error: "Failed to upload to Google Cloud Storage." });
    });

    await new Promise<void>((resolve, reject) => {
      blobStream.on("finish", resolve);
      blobStream.on("error", reject);
      blobStream.end(file.buffer);
    });

    const [url] = await blob.getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ url, error: null });
  } catch (e) {
    console.error("Error uploading file", e);
    res.status(500).json({ error: "Server error" });
  }
}
