import { AccountInfo } from "./account-info";

export interface Class {
  name: string;
  student: AccountInfo[];
  teacher: AccountInfo;
  refDocsList?: string[];
  thesisList?: string[];
  semester: string;
  schoolYear: string;
  major: string;
  description: string;
}
