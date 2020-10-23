declare interface ICourseInfo {
  _id: string;
  name: string;
  code: string;
}

declare interface ICourse {
  _id: string;
  name: string;
  code: string;
  threads: IThread[];
}

declare interface IThread {
  _id: string;
  title: string;
  creator: string;
}

declare interface IProfile {
  _id: string;
  name: string;
  iitkEmail: string;
  rollNo: number;
}

declare interface IResource {
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
