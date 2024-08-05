import { Upload } from '@aws-sdk/lib-storage';
import { S3Client, DeleteObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Types } from 'mongoose';

import { BaseStorage } from './base.storage';

export class S3Storage extends BaseStorage {
  constructor() {
    super();

    const clientParams = {
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
      }
    };

    if (process.env.S3_URL) {
      clientParams.endpoint = process.env.S3_URL;
      clientParams.forcePathStyle = true;
    }

    this.client = new S3Client(clientParams);
  }

  async upload(file) {
    const { createReadStream, filename, mimetype } = file;

    const streamIn = createReadStream();


    const id = new Types.ObjectId();
    const Key = `${id.toString()}-${filename}`;

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key,
      Body: streamIn,
    }

    const upload = new Upload({
      client: this.client,
      params,
    });

    await upload.done();

    return {
      name: filename,
      mimeType: mimetype,
      path: Key,
    };
  }

  async remove(filePath) {
    await this.client.send(new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filePath,
    }));
  }

  async getDownloadUrl(filePath) {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: filePath
    });

    return getSignedUrl(this.client, command, {
      expiresIn: 5 * 60,
    });
  }
}