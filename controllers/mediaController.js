import Session from '../models/session.js';
import Media from '../models/media.js';
import { uploadFile } from '../utils/s3.js';

const mediaController = {
    async uploadMedia(req, res) {
        const { sessionToken, mediaId, fileContent, mimeType } = req.body;

        try {
            // Validate session token
            const session = await Session.getByToken(sessionToken);
            if (!session) {
                return res.status(401).json({ error: 'Invalid or expired session token' });
            }

            // Get media details
            const media = await Media.getById(mediaId);
            if (!media) {
                return res.status(404).json({ error: 'Media not found' });
            }

            // Upload file to S3
            const result = await uploadFile(fileContent, media.url, mimeType);

            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to upload file' });
        }
    },
    // Add more methods as needed
};

export default mediaController;
