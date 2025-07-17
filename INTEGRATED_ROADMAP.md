# Storage Project Overview

This document summarises the current features of the **storage-file-server-2** repository alongside its related projects, **storage-server-2** and **storage-client-2**. It also outlines a suggested roadmap for future work on **storage-file-server-2**.

## Completed Features

### storage-file-server-2
- Express HTTP API for basic user management and file uploads.
- Endpoints for listing and creating users.
- Session-token validated upload endpoint that stores files to an S3 compatible service.

### storage-server-2
- GraphQL API built with Apollo Server and Express.
- Extensive schema covering users, authentication, media metadata, comments and likes.
- Development tooling with Jest tests and ESLint linting.

### storage-client-2
- React/Next.js front end that communicates with the GraphQL server.
- Allows users to authenticate, browse media and upload new files.
- Project structure includes pages, components and Redux-based authentication logic.

## Suggested Roadmap for storage-file-server-2
1. **Authentication & Session Management**
   - Add login/logout routes using JWT and bcrypt password hashing.
   - Implement refresh tokens and session expiry similar to storage-server-2.
2. **File Operations**
   - Provide download and delete endpoints for files stored in S3.
   - Expose metadata retrieval endpoints.
3. **User Management Enhancements**
   - Add update and delete user endpoints.
   - Incorporate role-based access for admin functions.
4. **Operational Improvements**
   - Integrate request logging with morgan or winston.
   - Add structured error responses.
5. **Deployment and Testing**
   - Supply Docker/docker-compose files for the server itself.
   - Implement automated tests covering API routes and S3 interactions.
   - Align API with the GraphQL server so the client can reuse authentication tokens.

The goal is to evolve storage-file-server-2 into a file-handling companion to the GraphQL backend and React client, providing a consistent authentication and storage layer across the whole project.
