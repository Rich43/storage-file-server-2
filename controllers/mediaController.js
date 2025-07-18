import Session from '../models/session.js';
import Media from '../models/media.js';
import { uploadFile, downloadFile, deleteFile, getFileMetadata } from '../utils/s3.js';

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
    async downloadMedia(req, res) {
        const { id } = req.params;
        try {
            const media = await Media.getById(id);
            if (!media) {
                return res.status(404).json({ error: 'Media not found' });
            }
            const file = await downloadFile(media.url);
            res.set('Content-Type', file.ContentType);
            res.send(file.Body);
        } catch (error) {
            res.status(500).json({ error: 'Failed to download file' });
        }
    },
    async deleteMedia(req, res) {
        const { id } = req.params;
        try {
            const media = await Media.getById(id);
            if (!media) {
                return res.status(404).json({ error: 'Media not found' });
            }
            await deleteFile(media.url);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete file' });
        }
    },
    async getMediaMetadata(req, res) {
        const { id } = req.params;
        try {
            const media = await Media.getById(id);
            if (!media) {
                return res.status(404).json({ error: 'Media not found' });
            }
            const meta = await getFileMetadata(media.url);
            res.json({ db: media, s3: meta });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve metadata' });
        }
    },
    // Add more methods as needed
};

export default mediaController;
