import { RoleAccount } from "./enum/roleEnum";

export interface AccountInfo {
  _id: string,
  role: RoleAccount,
  email: string,
  fullName: string,
  gender: string,
  phoneNumber: string,
  address: string,
  code: string,
  major: string,
  followClass?: any;
  instructClass?: any;
  topic?: string;
  avatar?: string;
}

export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
  _id: string;
}
