import { User } from "./user";

export interface Asset {
  id: string;
  title: string;
  slug: string;
  type: string;
  thumbnailUrl: string;
  photoDirUrl: string;
  splatUrl: string;
  pclUrl: string;
  pclColmapUrl: string;
  segmentedPclDirUrl: string;
  segmentedSplatDirUrl: string;
  isPrivate: boolean;
  status: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  user: User;
  isLikedByMe: boolean;
}

export enum AssetStatus {
  GENERATING_SPARSE_POINTCLOUD = "generating sparse point cloud",
  GENERATING_3D_SPLAT = "generating 3d splat",
  PROCESSING_PTV3 = "processing ptv3",
  PROCCESING_SAGA = "processing saga",
  COMPLETED = "completed",
}
