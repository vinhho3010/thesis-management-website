import { AccountInfo } from "./account-info";
import { Class } from "./class";
import { ThesisStatus } from "./enum/thesis-status";
import { ThesisVersion } from "./milestone";

export interface Thesis {
  _id: string;
  name: string;
  description: string;
  student: AccountInfo;
  topic: string;
  topicEng: string;
  versions: ThesisVersion[];
  results: any[];
  status: ThesisStatus;
  class: Class
  semester: string;
  schoolYear: string
  url?: string;
  isCustomUrl?: boolean;
  customUrl?: string;
  customFileName?: string;
}
