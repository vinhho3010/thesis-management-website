import { Class } from "./class";

export interface Milestone {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  class: Class | string;
  comments?: any[];
  thesisVersionList: ThesisVersion[] | string[];
  _id: string;
}

export interface ThesisVersion {
  _id: string;
  url: string;
  fileName: string;
  milestone: Milestone;
  student: any;
  updatedAt: Date;
  createdAt: Date;
}
