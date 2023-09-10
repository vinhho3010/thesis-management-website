import { RoleAccount } from "./enum/roleEnum";

export interface AccountInfo {
  Role: RoleAccount,
  email: string,
  fullName: string,
  gender: string,
  phoneNumber: string,
  address: string,
  code: string
}
