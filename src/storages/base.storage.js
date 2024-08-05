/* eslint-disable no-unused-vars */

export class BaseStorage {
  upload(file) {
    throw new Error('Not implemented');
  }

  remove(file) {
    throw new Error('Not implemented');
  }

  getDownloadUrl(file) {
    throw new Error('Not implemented');
  }
}