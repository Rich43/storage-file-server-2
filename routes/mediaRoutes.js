import { Router } from 'express';
import mediaController from '../controllers/mediaController.js';

const router = Router();

router.post('/upload', mediaController.uploadMedia);
router.get('/:id/download', mediaController.downloadMedia);
router.delete('/:id', mediaController.deleteMedia);
router.get('/:id/metadata', mediaController.getMediaMetadata);
// Add more routes as needed

export default router;

