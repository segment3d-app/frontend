"use server";

import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function removeAsset(id: string): Promise<Asset> {
  "use server";
  try {
    const { data } = await serverAxios.delete<{ asset: Asset }>(
      `/api/assets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );
    return data.asset;
  } catch (error) {
    throw error;
  }
}
