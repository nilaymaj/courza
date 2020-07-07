import AWS from 'aws-sdk';
import fs from 'fs';
import { warn } from './logger';
import { Metafile } from '../types';
import { NotFoundError } from './errors';

let S3Instance: null | AWS.S3 = null;
const FILE_URL_REGEX = /https:\/\/courza.s3.ap-south-1.amazonaws.com\/([^\/]+)\/([^\/]+)\/([^\/]+)/;

type Category = 'resources' | 'profile' | 'image';

export const initStorage = async () => {
  AWS.config.loadFromPath('./keys/aws-credentials.json');
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials((err) => {
      if (err) reject(err);
      else {
        S3Instance = new AWS.S3();
        resolve();
      }
    });
  });
};

const _getS3 = () => {
  if (S3Instance) return S3Instance;
  warn('Reinitializing S3 service object', 'aws');
  S3Instance = new AWS.S3();
  return S3Instance;
};

/**
 * Uploads a file of given category to AWS storage
 */
export const upload = async (category: Category, metafile: Metafile) => {
  const S3 = _getS3();
  const filestream = fs.createReadStream(metafile.path);
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'courza',
    Key: `${category}/${metafile.filename}/${metafile.originalname}`,
    Body: filestream,
    ContentType: metafile.mimetype,
  };
  const res = await S3.upload(params).promise();
  return res.Location;
};

/**
 * Destroys file at given path in AWS storage
 */
export const destroy = async (filePath: string) => {
  const S3 = _getS3();
  const matches = filePath.match(FILE_URL_REGEX);
  if (!matches) throw new NotFoundError('Invalid file URL');
  const [_, category, folder, filename] = matches;
  const params: AWS.S3.DeleteObjectRequest = {
    Bucket: 'courza',
    Key: `${category}/${folder}/${filename}`,
  };
  const res = await S3.deleteObject(params).promise();
  warn(`AWS Delete object response: ${res.$response}`, 'aws');
};
