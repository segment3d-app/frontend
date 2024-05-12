import Viewer from "@/components/viewer/viewer";
import { getAssetDetails } from "../../action";

export default async function RenderAsset({
  params,
}: {
  params: { slug: string };
}) {
  const asset = await getAssetDetails(params.slug);
  return <Viewer />;
}
