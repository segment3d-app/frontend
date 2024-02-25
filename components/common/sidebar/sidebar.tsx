"use client";

import { usePathname, useRouter } from "next/navigation";
import Create from "./components/create";
import {
  CameraIcon,
  FilePlusIcon,
  MixIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import { Toggle } from "../../ui/toggle";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import UploadIcon from "./components/upload-icon";
import { ChangeEvent, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import Image from "next/image";
import { toast as sonner } from "sonner";

import * as Yup from "yup";
import UploadFileHandler from "@/utils/uploadFileHandler";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";

const UploadVideoSchema = Yup.object().shape({
  name: Yup.string().required("name is required"),
  privacy: Yup.string()
    .oneOf(["private", "public"], "privacy should be one of private or poblic")
    .required("privacy is required"),
});

interface Create3DAssetForm {
  name: string;
  privacy: string;
}

export default function Sidebar() {
  const pathName = usePathname();
  const route = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { accessToken, getIsAuthenticated } = useAuthStore();
  const [uploadedFile, setUploadedFile] = useState<{
    type: "images" | "video";
    vidData?: {
      file?: File | null;
      dataUrl?: string | null;
      url?: string | null;
    } | null;
    imgData?:
      | {
          file?: File | null;
          dataUrl?: string | null;
          url?: string | null;
        }[]
      | null;
  } | null>(null);

  const SIDEBAR_DATA = [
    {
      id: 1,
      name: "Explore",
      path: "/explore",
      icon: <RocketIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        route.push("/explore");
      },
    },
    {
      id: 2,
      name: "Capture",
      path: "/capture",
      icon: <CameraIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        if (!getIsAuthenticated()) {
          isNotLoginHandler();
          return;
        }
        route.push("/capture");
      },
    },
    {
      id: 3,
      name: "Album",
      path: "/album",
      icon: <MixIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        if (!getIsAuthenticated()) {
          isNotLoginHandler();
          return;
        }
        route.push("/album");
      },
    },
    {
      id: 4,
      name: <Create />,
      icon: <FilePlusIcon className="h-[20px] w-[20px]" />,
      onClick: () => {},
    },
  ];

  const isNotLoginHandler = () => {
    document.getElementById("dialog-auth-btn")?.click();
    toast({
      title: "Error",
      description: "you need to login first",
      variant: "destructive",
    });
  };

  const openDirectory = () => {
    if (isLoading) return;
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,video/*";
    fileInput.multiple = true;
    fileInput.addEventListener(
      "change",
      handleFileUpload as unknown as EventListener,
    );
    fileInput.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = event.target.files;
    const length = files?.length;

    if (files && length) {
      if (files[0].type.includes("image")) {
        handleFileImagesUpload(files);
      } else if (files[0].type.includes("video")) {
        handleFileVideoUpload(files);
      } else {
        toast({
          title: "Error",
          description: "format file is not supported",
          variant: "destructive",
        });
      }
      if (event.target) {
        (event.target as HTMLInputElement).value = "";
      }
    } else {
      toast({
        title: "Error",
        description: "failed to upload file",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleFileVideoUpload = async (files: FileList) => {
    if (files.length > 1 || !files.length) {
      toast({
        title: "Error",
        description: "You need to upload 1 video",
        variant: "destructive",
      });
      return;
    }

    const readVideoFileAsDataURL = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.onerror = () => {
          reject(new Error("Failed to read video file"));
        };
        reader.readAsDataURL(file);
      });
    };

    try {
      const file = files[0];
      const fileUploadedURL = await readVideoFileAsDataURL(file);
      if (typeof fileUploadedURL === "string") {
        setUploadedFile({
          type: "video",
          vidData: {
            file: file,
            dataUrl: fileUploadedURL,
          },
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to upload video",
        variant: "destructive",
      });
    }
  };

  const handleFileImagesUpload = (files: FileList) => {
    if (files.length < 20) {
      toast({
        title: "Error",
        description: "You need to upload at least 20 images",
        variant: "destructive",
      });
      return;
    }

    const promises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve({
              file: file,
              dataUrl: reader.result,
            });
          } else {
            reject(new Error("Failed to load image"));
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises)
      .then((result) => {
        setUploadedFile({
          type: "images",
          imgData: result as {
            file?: File | null | undefined;
            dataUrl?: string | null | undefined;
            url?: string | null | undefined;
          }[],
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Error loading one or more images",
          variant: "destructive",
        });
      });
  };

  const create3DAssetHandler = async (
    values: Create3DAssetForm,
    { setSubmitting }: FormikHelpers<Create3DAssetForm>,
  ) => {
    setSubmitting(true);

    try {
      let folderName = `assets/${values.name}/source`;
      const {
        error,
        url,
        message,
      }: {
        error?: any | null;
        url?: string[] | null;
        message?: string | null;
      } = await UploadFileHandler(
        folderName,
        uploadedFile?.type === "video"
          ? uploadedFile?.vidData?.file
          : uploadedFile?.imgData?.map((data) => data.file as File),
        uploadedFile?.type === "images" ? true : false,
      );
      if (!error) {
        sonner("Success", {
          description: message,
        });
        let assetUrl = (url?.length ?? 0) >= 1 ? url?.[0] : "";
        if (uploadedFile?.type === "images") {
          let tempArr = assetUrl?.split("/");
          assetUrl = tempArr?.splice(0, tempArr.length - 1)?.join("/");
        }
        const { data } = await axios.post(
          "/api/assets",
          {
            assetType: uploadedFile?.type,
            assetUrl: assetUrl,
            isPrivate: values.privacy === "private" ? true : false,
            title: values.name,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } },
        );
        sonner("Success", {
          description: data?.message,
        });

        setUploadedFile(null);
        document.getElementById("create-gaussian-splatting-trigger")?.click();
        if (pathName.includes("capture")) {
        } else {
          route.push("/capture");
        }
      } else {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        variant: "destructive",
      });
    }

    setSubmitting(false);
  };

  return (
    <div
      className={`fixed left-0 top-16 box-border block h-full  h-screen w-full min-w-[250px] max-w-[250px] overflow-y-auto overflow-x-hidden overflow-y-scroll border-r border-border/40 bg-background/95 bg-white px-0 px-[32px] pb-0 pt-4 backdrop-blur supports-[backdrop-filter]:bg-background/60`}
      style={{
        transition: "right 500ms, top 500ms ease-in-out",
        msOverflowStyle: "none",
        scrollbarWidth: "none",
      }}
    >
      {SIDEBAR_DATA.map((sidebar) => (
        <Toggle
          pressed={sidebar?.path ? pathName.includes(sidebar?.path) : false}
          key={sidebar.id}
          onClick={sidebar.onClick}
          className="text-md flex h-14 w-full cursor-pointer items-center !justify-start gap-4 hover:bg-inherit"
        >
          <div>{sidebar.icon}</div>
          <div>{sidebar.name}</div>
        </Toggle>
      ))}

      {/* Upload Video Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button id="create-gaussian-splatting-trigger" className="hidden" />
        </DialogTrigger>
        <DialogContent className="max-w-[576px]">
          {!uploadedFile ? (
            <>
              <DialogTitle>Upload Video</DialogTitle>
              <div className="my-4 flex w-full cursor-pointer justify-center ">
                <div
                  className="flex h-[236px] w-[410px] flex-col items-center justify-center gap-4 rounded-lg bg-[#FFFFFF0A] px-8 text-center text-sm hover:bg-[#FFFFFF0F]"
                  onClick={openDirectory}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                        role="status"
                      />
                      <span>Loading...</span>
                    </>
                  ) : (
                    <>
                      <div>
                        <UploadIcon />
                      </div>
                      <p>
                        Upload or drop video with a duration of 2-3 minutes{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <DialogFooter>
                <DialogClose onClick={() => setUploadedFile(null)} asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <>
              <Formik
                initialValues={{
                  name: "",
                  privacy: "",
                }}
                onSubmit={create3DAssetHandler}
                validationSchema={UploadVideoSchema}
              >
                {({ isSubmitting, setFieldValue }) => (
                  <Form>
                    <DialogTitle>Fill Asset Attribute</DialogTitle>
                    <div className="my-4 grid min-h-[300px] w-full grid-cols-5 gap-6">
                      <div className="col-span-2 flex h-full items-center rounded-lg border-[0.2px]">
                        {uploadedFile.type === "video" ? (
                          <div className="relative h-full w-full">
                            <video
                              src={
                                uploadedFile?.vidData?.dataUrl ??
                                (uploadedFile?.vidData?.url as string)
                              }
                              autoPlay
                              playsInline
                              disablePictureInPicture
                              controls
                              loop
                              className="h-full w-full object-contain"
                              style={{ objectFit: "contain" }}
                            ></video>
                            <canvas className="hidden"></canvas>
                            <div className="css-1bo7h9d backface-visibility-hidden absolute bottom-0 left-0 bg-black bg-opacity-50 p-2 text-white">
                              <p className="chakra-text">
                                {uploadedFile?.vidData?.file?.name}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="grid grid-cols-2">
                            {uploadedFile.imgData
                              ?.slice(0, 4)
                              .map((img, id) => (
                                <div key={img.file?.name + id.toString()}>
                                  {id == 3 &&
                                  (uploadedFile?.imgData?.length ?? 0) > 4 ? (
                                    <div className="relative">
                                      <Image
                                        src={img.dataUrl ?? (img.url as string)}
                                        width={500}
                                        height={500}
                                        alt={img.file?.name ?? ""}
                                      />
                                      <div
                                        style={{
                                          background:
                                            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))",
                                        }}
                                        className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                                      >
                                        +
                                        {(uploadedFile?.imgData?.length ?? 0) -
                                          4}
                                      </div>
                                    </div>
                                  ) : (
                                    <Image
                                      src={img.dataUrl ?? (img.url as string)}
                                      width={500}
                                      height={500}
                                      alt={img.file?.name ?? ""}
                                    />
                                  )}
                                </div>
                              ))}
                          </div>
                        )}
                      </div>
                      <div className="col-span-3">
                        <div className="grid grid-cols-2 gap-6">
                          <div className="col-span-2 grid gap-1">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Title
                            </label>
                            <Field
                              name="name"
                              id="name"
                              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                              placeholder={
                                uploadedFile?.vidData?.file?.name.split(
                                  ".",
                                )[0] || "asset name"
                              }
                              type="text"
                            />
                            <div className="px-4 text-xs text-red-500">
                              <ErrorMessage name="name" />
                            </div>
                          </div>

                          <div className="col-span-2 grid gap-1">
                            <label
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              htmlFor="name"
                            >
                              Privacy
                            </label>
                            <Select
                              onValueChange={(val) =>
                                setFieldValue("privacy", val)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="None" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="private">Private</SelectItem>
                                <SelectItem value="public">Public</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="px-4 text-xs text-red-500">
                              <ErrorMessage name="privacy" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          disabled={isSubmitting}
                          onClick={() => setUploadedFile(null)}
                          variant="secondary"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        disabled={isSubmitting}
                        className="disable:cursor-not-allowed inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                        type="submit"
                      >
                        {isSubmitting ? (
                          <>
                            <div
                              className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                              role="status"
                            />
                            <span>Uploading...</span>
                          </>
                        ) : (
                          "Create"
                        )}
                      </Button>
                    </DialogFooter>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
