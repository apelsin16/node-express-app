import { createWriteStream, unlinkSync } from 'fs';
import { Types } from 'mongoose';

import { BaseStorage } from './base.storage';

export class LocalStorage extends BaseStorage {
  async upload(file) {
    const { createReadStream, filename, mimetype } = file;

    const id = new Types.ObjectId();
    const path = `${process.cwd()}/files/${id.toString()}-${filename}`;

    const streamIn = createReadStream();
    const streamOut = createWriteStream(path);

    streamIn.pipe(streamOut);

    await new Promise((resolve, reject) => {
      streamOut.on('error', (error) => reject(error));
      streamOut.on('finish', () => resolve());
    });

    return {
      name: filename,
      mimeType: mimetype,
      path,
    }
  }

  remove(filePath) {
    unlinkSync(filePath);
  }
}