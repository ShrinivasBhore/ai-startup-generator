import { Router } from 'express';
import { generateStartup } from '../controllers/generate.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// Endpoint protected by authentication middleware
router.post('/startup', protect, generateStartup);

export default router;
