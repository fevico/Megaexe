import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import * as formidable from 'formidable';
import { v2 as cloudinaryV2 } from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  constructor() {
    cloudinaryV2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });
  }

  async uploadFile(file: formidable.File): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinaryV2.uploader.upload(file.filepath, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result.secure_url);
      });
    });
  }
}
