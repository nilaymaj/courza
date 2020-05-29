import AWS from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import { warn } from './logger';
import { Metafile } from '../types';

const filepath = '../utils/token.ts';
let S3Instance: null | AWS.S3 = null;

export const initStorage = async () => {
  AWS.config.loadFromPath('./keys/aws-credentials.json');
  return new Promise((resolve, reject) => {
    AWS.config.getCredentials((err) => {
      if (err) reject(err);
      else {
        S3Instance = new AWS.S3();
        // _testFileUpload();
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

const _testFileUpload = async () => {
  const filedata = fs.readFileSync(path.join(__dirname, filepath));
  const S3 = _getS3();
  const params = { Bucket: 'courza', Key: 'test/sometoken.ts', Body: filedata };
  S3.upload(params)
    .promise()
    .then(() => console.log('Uploaded test file'))
    .catch((err) => console.log(err));
};

export const uploadFile = async (metafile: Metafile) => {
  const S3 = _getS3();
  const filestream = fs.createReadStream(metafile.path);
  const params: AWS.S3.PutObjectRequest = {
    Bucket: 'courza',
    Key: `resources/${metafile.filename}/${metafile.originalname}`,
    Body: filestream,
    ContentType: metafile.mimetype,
  };
  const res = await S3.upload(params).promise();
  return res.Location;
};
