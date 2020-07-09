export interface CourseInfo {
  _id: string;
  name: string;
  code: string;
}

export interface Course {
  _id: string;
  name: string;
  code: string;
  threads: Thread[];
}

export interface Thread {
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
  url: string;
  student: {
    name: string;
    _id: string;
  };
  category: {
    name: string;
    _id: string;
  };
}
