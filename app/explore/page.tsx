import Explore from "@/components/explore/explore";
import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const { data } = await serverAxios.get<{ assets: Asset[] }>("/api/assets", {
    headers: {
      Authorization: `Bearer ${cookies().get("accessToken")?.value}`,
    },
  });
  return <Explore assets={data.assets} />;
}
