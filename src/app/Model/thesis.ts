import { AccountInfo } from "./account-info";
import { Class } from "./class";
import { ThesisStatus } from "./enum/thesis-status";

export interface Thesis {
  name: string;
  description: string;
  student: AccountInfo;
  topic: string;
  topicEng: string;
  refUrl: string;
  versions: any[];
  results: any[];
  status: ThesisStatus;
  class: Class
  semester: string;
  schoolYear: string;
}
