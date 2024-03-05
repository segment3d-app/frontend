import { User } from "./user";

export interface Asset {
  assetType: string;
  assetUrl: string;
  createdAt: string;
  gaussianUrl: string;
  id: string;
  isPrivate: boolean;
  likes: number;
  pointCloudUrl: string;
  slug: string;
  status: string;
  thumbnailUrl: string;
  title: string;
  updatedAt: string;
  isLikedByMe: boolean;
  user: User;
}
