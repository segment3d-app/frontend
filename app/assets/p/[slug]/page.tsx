import PointCloudViewer from "@/components/viewer/ply-loader";

export default function RenderAsset() {
  return (
    <PointCloudViewer plyFilePath="https://storage.googleapis.com/segment3d-app/test-pcl.ply" />
  );
}
