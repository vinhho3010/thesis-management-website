import { AccountInfo } from "./account-info";
import { Major } from "./major.model";

export interface Class {
  _id: string;
  name: string;
  student: AccountInfo[];
  teacher: AccountInfo;
  refDocsList?: string[];
  thesisList?: string[];
  semester: string;
  schoolYear: string;
  major: string | Major;
  description: string;
}
