import express from 'express';
import { prisma } from '../utils/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all reagents
router.get('/', async (req, res) => {
  try {
    const reagents = await prisma.reagent.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: { reagents }
    });
  } catch (error) {
    logger.error('Get reagents error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch reagents' }
    });
  }
});

// Create new reagent
router.post('/', async (req, res) => {
  try {
    const reagent = await prisma.reagent.create({
      data: req.body
    });

    res.status(201).json({
      success: true,
      data: { reagent }
    });
  } catch (error) {
    logger.error('Create reagent error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create reagent' }
    });
  }
});

export default router;