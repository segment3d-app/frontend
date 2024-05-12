"use server";

import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export async function getAssetDetails(slug: string): Promise<Asset> {
  "use server";

  try {
    const { data } = await serverAxios.get<{ asset: Asset }>(
      `/api/assets/${slug}`,
      {
        headers: {
          Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
        },
      },
    );
    return data.asset;
  } catch (error: any) {
    throw error;
  }
}
