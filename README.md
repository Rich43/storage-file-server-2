Getting started with the project
--------------------------------

### Prerequisites
- Min.IO server
- MySQL server
- Docker
- Docker-compose
- Node.js
- NPM

### Installation
1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:
    ```
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=root
    DB_NAME=storage
    AWS_ACCESS_KEY_ID=uZnZVQ9ZZiL08tF6fEKj
    AWS_SECRET_ACCESS_KEY=yZ6LwRC9J1wr9vvoAG7Tuf3z2KITSCTc6dSwFovf
    MINIO_ENDPOINT=http://localhost:9000
    AWS_BUCKET_NAME=storage
    PORT=3500
    ```
4. Start up the docker compose files at https://github.com/Rich43/storage-docker/tree/main
5. Run `npm start` to start the server
