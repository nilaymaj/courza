import multer from 'multer';
import path from 'path';
// import mime from 'mime';

// const storage = multer.diskStorage({
//   destination: path.join(__dirname, 'uploads'),
//   filename: (_req, file, cb) => {
//     const uid = uuid.v4();
//     const filename = uid + '.' + mime.getExtension(file.mimetype);
//     cb(null, filename);
//   },
// });

const uploadPath = path.join(__dirname, 'uploads/');
const upload = multer({ dest: uploadPath });

export default upload;
