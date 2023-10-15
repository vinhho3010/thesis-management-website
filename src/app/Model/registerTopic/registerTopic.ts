import { PendingStatus } from "../enum/pendingStatus";

export interface RegisteredTopic {
  _id: string;
  student: string;
  class: any;
  status: PendingStatus;
  type: string;
  topic: string;
  topicEng: string;
  description: string;
  semester: string;
  schoolYear: string;
}
