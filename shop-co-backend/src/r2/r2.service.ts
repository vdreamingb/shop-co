import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer'

@Injectable()
export class R2Service {
    private s3: S3Client
    private bucket: string

    constructor(private readonly configService: ConfigService){
        const bucket = this.configService.get<string>('R2_BUCKET');
        if (!bucket) {
            throw new Error('R2_BUCKET environment variable is not set');
        }
        this.bucket = bucket;
        
        this.s3 = new S3Client({
            region: 'auto',
            endpoint: this.configService.get('R2_ENDPOINT'),
            credentials: {
                accessKeyId: this.configService.get<string>('R2_ACCESS') as string,
                secretAccessKey: this.configService.get<string>('R2_SECRET') as string,
            },
        })

    }

    async uploadImg(file: Multer.File, filename: string):Promise<string>{
        const key = `products/${Date.now()}-${filename}`

        await this.s3.send(
            new PutObjectCommand({
                Bucket: this.bucket,
                Key: key,
                Body: file,
                ContentType: file.mimetype
            })
        )

        return `${this.configService.get('R2_PUBLIC_URL')}/${this.bucket}/${key}`
    }
}
