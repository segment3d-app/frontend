"use server";

import { User } from "@/model/user";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function signin(
  email: string,
  password: string,
): Promise<{ accessToken: string; user: User; message: string }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
      message: string;
    }>("/api/auth/signin", { email, password });

    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function google(
  token: string,
): Promise<{ accessToken: string; user: User; message: string }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
      message: string;
    }>("/api/auth/google", { token });
    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function signup(
  email: string,
  name: string,
  password: string,
): Promise<{ accessToken: string; user: User; message: string }> {
  "use server";
  try {
    const { data } = await serverAxios.post<{
      user: User;
      accessToken: string;
      message: string;
    }>("/api/auth/signup", { email, password, name });

    cookies().set("accessToken", data.accessToken);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function logout() {
  "use server";
  cookies().delete("accessToken");
}
