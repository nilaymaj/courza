import Resource from '../models/resource';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { uploadFile } from '../utils/storage';
import { Metafile } from '../types';
import { validatePdf } from '../utils/validators';

/**
 * Uploads PDF file to cloud and creates new resource in database
 */
export const uploadPdf = async (
  student: IStudent,
  course: ICourse,
  name: string,
  metafile: Metafile
) => {
  validatePdf(metafile);
  const url = await uploadFile(metafile);
  const resource = new Resource({
    student: student._id,
    course: course._id,
    name,
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
    .lean(lean);
  return allResources;
};
