import AWS from 'aws-sdk';

const s3 = new AWS.S3({
    endpoint: process.env.MINIO_ENDPOINT,
    s3ForcePathStyle: true,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const bucket = process.env.AWS_BUCKET_NAME;

export function uploadFile(fileContent, key, mimeType) {
    const buffer = Buffer.from(fileContent, 'base64');
    const params = {
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: mimeType,
    };
    return s3.upload(params).promise();
}

export function downloadFile(key) {
    const params = {
        Bucket: bucket,
        Key: key,
    };
    return s3.getObject(params).promise();
}

export function deleteFile(key) {
    const params = {
        Bucket: bucket,
        Key: key,
    };
    return s3.deleteObject(params).promise();
}

export function getFileMetadata(key) {
    const params = {
        Bucket: bucket,
        Key: key,
    };
    return s3.headObject(params).promise();
}

