import Explore from "@/components/explore/explore";
import { Asset } from "@/model/asset";
import { serverAxios } from "@/utils/axios";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const { data } = await serverAxios.get<{ assets: Asset[] }>("/api/assets");
  return <Explore assets={data.assets} />;
}
