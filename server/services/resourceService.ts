import Resource, { IResource } from '../models/resource';
import { ICourse } from '../models/course';
import { IStudent } from '../models/student';
import { uploadFile } from '../utils/storage';
import { Metafile } from '../types';
import { validatePdf } from '../utils/validators';

export const uploadPdfResource = async (
  student: IStudent,
  course: ICourse,
  data: { name: string; description: string },
  metafile: Metafile
) => {
  validatePdf(metafile);
  const url = await uploadFile(metafile);
  const resource = new Resource({
    student: student._id,
    course: course._id,
    ...data,
    url,
  });
  await resource.save();
  return resource;
};
