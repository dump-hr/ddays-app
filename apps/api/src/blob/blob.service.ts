import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import mime from 'mime-types';

@Injectable()
export class BlobService {
  private bucket = process.env.AWS_S3_BUCKET;
  private url = process.env.AWS_S3_URL;

  private client = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: 'eu-central-1',
  });

  async upload(
    directory: string,
    filename: string,
    buffer: Buffer,
    mimetype: string,
  ) {
    const extension = mime.extension(mimetype);

    const key = `${directory}/${filename}.${extension}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: extension,
    });

    try {
      await this.client.send(command);

      const imageUrl = `${this.url}/${key}`;

      return imageUrl;
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }
  }
}
