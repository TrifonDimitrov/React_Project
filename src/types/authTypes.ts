import { UserProfile } from "./userType";

export interface AuthResponse {
  token: string;
  user: UserProfile;
}
