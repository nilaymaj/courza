import Resource from '../models/resource';
import ResourceCategory, {
  IResourceCategory,
} from '../models/resource-category';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import * as Cloud from '../utils/storage';
import { Metafile } from '../types';
import { validatePdf } from '../utils/validators';

/**
 * Uploads PDF file to cloud and creates new resource in database
 */
export const uploadPdf = async (
  student: IStudent,
  course: ICourse,
  metafile: Metafile,
  data: { name: string; category: string }
) => {
  validatePdf(metafile);
  // Check if category exists, otherwise create one.
  let category: IResourceCategory;
  category = await ResourceCategory.findOne({
    name: data.category,
    course: course._id,
  });
  if (!category) {
    category = new ResourceCategory({
      name: data.category,
      student: student._id,
      course: course._id,
    });
    await category.save();
  }
  // Upload file to cloud
  const url = await Cloud.upload('resources', metafile);
  // Create resource in database
  const resource = new Resource({
    student: student._id,
    course: course._id,
    name: data.name,
    category: category._id,
    url,
  });
  await resource.save();
  return resource;
};

/**
 * Returns list of all course resources from database
 */
export const getAll = async (course: ICourse, lean = false) => {
  const allResources = Resource.find({ course: course._id })
    .populate('student', ['_id', 'name'])
    .populate('category', ['_id', 'name'])
    .lean(lean);
  return allResources;
};
