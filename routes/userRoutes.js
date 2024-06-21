import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
// Add more routes as needed

export default router;
