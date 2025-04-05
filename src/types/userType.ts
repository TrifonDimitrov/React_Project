import { Climate } from "./productType";

export interface UserProfile {
  _id: string;
  email: string;
  userName: string;
  climates?: Climate[];
  created_at?: string;
  updatedAt?: string;
}
