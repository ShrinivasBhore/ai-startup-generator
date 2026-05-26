import { Request, Response } from 'express';
import { generateStartupPlan } from '../services/ai.service';
import { prisma } from '../prisma/db';
import { AuthRequest } from '../middleware/auth.middleware';

export const generateStartup = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { idea, industry, budget, audience } = req.body;
    
    if (!idea || !industry) {
      res.status(400).json({ error: 'Idea and Industry are required' });
      return;
    }

    // Call the AI service
    const plan = await generateStartupPlan({ idea, industry, budget, audience });

    // In a full application, we would save this to the database here using Prisma.
    // For now, we return it to the client for the workspace session.

    res.status(200).json({ plan });
  } catch (error: any) {
    console.error('Generation Error:', error);
    res.status(500).json({ error: error.message || 'Error generating startup plan' });
  }
};
