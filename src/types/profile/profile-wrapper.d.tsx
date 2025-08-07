import { ProfileBaseType } from "./profile-base.d";

export interface ProfileWrapperType extends ProfileBaseType {
  children: React.ReactNode; 
  hero?: boolean;
}
