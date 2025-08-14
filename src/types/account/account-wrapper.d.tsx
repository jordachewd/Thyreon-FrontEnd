import { AccountBaseType } from "./account-base.d";

export interface AccountWrapperType extends AccountBaseType {
  children: React.ReactNode; 
  hero?: boolean;
}
