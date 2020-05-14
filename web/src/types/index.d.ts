export interface CourseInfo {
  _id: string;
  name: string;
  code: string;
}

export interface Course {
  _id: string;
  name: string;
  code: string;
  chats: Chat[];
}

export interface Chat {
  _id: string;
  title: string;
  creator: string;
}

export interface Profile {
  _id: string;
  name: string;
  iitkEmail: string;
  rollNo: number;
}

export interface Resource {
  _id: string;
  name: string;
  description: string;
  url: string;
}
