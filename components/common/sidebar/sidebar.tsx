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

import * as Yup from "yup";

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
  const [uploadedFile, setUploadedFile] = useState<{
    file?: File | null;
    dataUrl?: string | null;
    url?: string | null;
  } | null>();

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
        route.push("/capture");
      },
    },
    {
      id: 3,
      name: "Gallery",
      path: "/gallery",
      icon: <MixIcon className="h-[20px] w-[20px]" />,
      onClick: () => {
        route.push("/gallery");
      },
    },
    {
      id: 4,
      name: <Create />,
      icon: <FilePlusIcon className="h-[20px] w-[20px]" />,
      onClick: () => {},
    },
  ];

  const openDirectory = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "video/*";
    fileInput.multiple = false;
    fileInput.addEventListener(
      "change",
      handleFileUpload as unknown as EventListener,
    );
    fileInput.click();
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length && event.target.files.length > 1) {
      toast({
        title: "Error",
        description: "cannot upload more than 1 files",
        variant: "destructive",
      });
      return;
    }

    const file = event.target.files && event.target.files[0];
    if (file) {
      if (!file.type.includes("video")) {
        toast({
          title: "Error",
          description: "please upload video",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          const fileUploadedURL = reader.result;
          setUploadedFile({ file: file, dataUrl: fileUploadedURL }); // Move this line here to ensure fileUploadedURL is set before updating the state
        }
      };
      reader.readAsDataURL(file);
      if (event.target) {
        (event.target as HTMLInputElement).value = "";
      }
    }
  };

  const create3DAssetHandler = async (
    values: Create3DAssetForm,
    { setSubmitting }: FormikHelpers<Create3DAssetForm>,
  ) => {
    setSubmitting(true);

    console.log(values);

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
                  <div>
                    <UploadIcon />
                  </div>
                  <p>Upload or drop video with a duration of 2-3 minutes </p>
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
                        <div className="relative h-full w-full">
                          <video
                            src={
                              uploadedFile.dataUrl ??
                              (uploadedFile.url as string)
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
                              {uploadedFile.file?.name}
                            </p>
                          </div>
                        </div>
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
                                uploadedFile.file?.name.split(".")[0]
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