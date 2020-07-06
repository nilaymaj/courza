import mng from 'mongoose';

// Documnet interface
export interface IResource extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  url: string;
  student: mng.Types.ObjectId;
  course: mng.Types.ObjectId;
}

// Statics interface
interface IStatics extends mng.Model<IResource> {}

// Database schema
const resourceSchema = new mng.Schema<IResource>(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 30,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    student: {
      type: mng.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    course: {
      type: mng.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
  },
  { timestamps: true }
);

const Resource = mng.model<IResource, IStatics>('Resource', resourceSchema);
export default Resource;
