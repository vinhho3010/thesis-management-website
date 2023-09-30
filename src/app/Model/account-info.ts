import { RoleAccount } from "./enum/roleEnum";

export interface AccountInfo {
  _id: string,
  Role: RoleAccount,
  email: string,
  fullName: string,
  gender: string,
  phoneNumber: string,
  address: string,
  code: string,
  major: string,
}
