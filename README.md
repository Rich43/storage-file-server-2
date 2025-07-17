# Storage File Server

A Node.js server that exposes a simple HTTP API for storing metadata in MySQL and uploading files to an S3 compatible service (tested with MinIO). It includes basic user management and a single endpoint for uploading file data using a session token.

## Prerequisites
- Node.js and npm
- MySQL database
- MinIO or other S3 compatible storage
- Docker and docker-compose (optional, for local infrastructure)

## Installation

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file in the project root with at least:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=storage
    AWS_ACCESS_KEY_ID=<access-key>
    AWS_SECRET_ACCESS_KEY=<secret-key>
    MINIO_ENDPOINT=http://localhost:9000
    AWS_BUCKET_NAME=storage
    PORT=3500
    ```
4. Start up the database and MinIO containers (the [storage-docker](https://github.com/Rich43/storage-docker/tree/main) repository contains compose files).
5. Run `npm start` to start the server.

## API protocol

### User endpoints

`GET /users`  
Return a JSON array of users.

`POST /users`  
Create a user. The request body is JSON representing the user fields stored in the `user` table.

### Media upload

`POST /media/upload`  
Upload raw file data directly to the configured S3 bucket. The request body must be JSON with the following fields:

```json
{
  "sessionToken": "string",
  "mediaId": 123,
  "fileContent": "Base64 encoded content",
  "mimeType": "image/png"
}
```

The server verifies that `sessionToken` exists in the `session` table and that `mediaId` refers to a row in the `media` table. On success, the file is uploaded to S3 at the path stored in `media.url` and the resulting S3 upload response is returned.

### Response Example
```json
{
  "Location": "http://localhost:9000/storage/path/file.png",
  "Bucket": "storage",
  "Key": "path/file.png",
  "ETag": "\"abc123\""
}
```

## Development

The default port is `3500` (overridable via the `PORT` env variable). Code changes are reloaded automatically through `nodemon`.
