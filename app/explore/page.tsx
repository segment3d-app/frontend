import Explore from "@/components/explore/explore";
import { getAllAsset } from "./action";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const assets = await getAllAsset("", []);
  return <Explore assets={assets} />;
}
