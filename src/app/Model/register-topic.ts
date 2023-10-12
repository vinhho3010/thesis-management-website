export interface registerToClassData {
  studentId: string;
  classId: string;
  type: string;
  topic: string;
  topicEng: string;
  status?: boolean;
  description?: string;
  semester?: string;
  schoolYear?: string;
}

export interface updateRegisterToClassData extends registerToClassData {
 _id: string;
}
