import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { SignInResponse, signIn } from "next-auth/react";
import GoogleLogo from "./google-logo";
import GithubLogo from "./github-logo";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikHelpers,
  FormikValues,
} from "formik";
import { useState } from "react";
import Link from "next/link";

interface LoginForm {
  email: string;
  password: string;
}

const loginFormInitialValue: LoginForm = {
  email: "",
  password: "",
};

export function SigninDialog() {
  const [form, setForm] = useState<LoginForm>(loginFormInitialValue);

  const signInWithEmailHandler = async (
    values: LoginForm,
    { setSubmitting }: FormikHelpers<LoginForm>,
  ) => {};

  const popupCenter = (url: string, title: string) => {
    const dualScreenLeft = window.screenLeft ?? window.screenX;
    const dualScreenTop = window.screenTop ?? window.screenY;
    const width =
      window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

    const height =
      window.innerHeight ??
      document.documentElement.clientHeight ??
      screen.height;

    const systemZoom = width / window.screen.availWidth;

    const popupWidth = Math.min(500, width); // Adjust the maximum width as needed
    const popupHeight = Math.min(600, height); // Adjust the maximum height as needed

    const left = (width - popupWidth) / 2 / systemZoom + dualScreenLeft;
    const top = (height - popupHeight) / 2 / systemZoom + dualScreenTop;

    const newWindow = window.open(
      url,
      title,
      `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`,
    );

    newWindow?.focus();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mt-5 flex flex-col space-y-2 text-center">
            <DialogTitle>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome Back!
              </h1>
            </DialogTitle>
            <DialogDescription>
              <p className="text-sm text-muted-foreground">
                Enter your email below to login into your account
              </p>
            </DialogDescription>
          </div>
        </DialogHeader>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="grid gap-6">
            <Formik initialValues={form} onSubmit={signInWithEmailHandler}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="grid gap-2">
                    <div className="grid gap-1">
                      <label
                        className="sr-only text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <Field
                        name="email"
                        id="email"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="name@example.com"
                        type="email"
                      />
                    </div>
                    <div className="grid gap-1">
                      <label
                        className="sr-only text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <Field
                        name="password"
                        id="password"
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="password"
                        type="password"
                      />
                    </div>
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
                          <span>Loading...</span>
                        </>
                      ) : (
                        "Sign In with Email"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              variant="outline"
              onClick={() => popupCenter("/auth/google", "Signin with Google")}
            >
              <GoogleLogo className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </div>
        <DialogFooter>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/terms"
            >
              Terms of Service
            </Link>
            and
            <Link
              className="underline underline-offset-4 hover:text-primary"
              href="/privacy"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
