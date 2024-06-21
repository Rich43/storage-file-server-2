import { Router } from 'express';
import mediaController from '../controllers/mediaController.js';

const router = Router();

router.post('/upload', mediaController.uploadMedia);
// Add more routes as needed

export default router;
