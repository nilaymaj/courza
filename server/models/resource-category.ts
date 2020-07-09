import mng from 'mongoose';

// Document interface
export interface IResourceCategory extends mng.Document {
  _id: mng.Types.ObjectId;
  name: string;
  student: mng.Types.ObjectId;
  course: mng.Types.ObjectId;
}

// Statics interface
interface IStatics extends mng.Model<IResourceCategory> {}

// Database schema
const resourceCategorySchema = new mng.Schema<IResourceCategory>(
  {
    name: {
      type: String,
      minlength: 5,
      maxlength: 30,
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

// Create compound index of name and course
resourceCategorySchema.index({ name: 1, course: 1 }, { unique: true });

const ResourceCategory = mng.model<IResourceCategory, IStatics>(
  'ResourceCategory',
  resourceCategorySchema
);
export default ResourceCategory;
