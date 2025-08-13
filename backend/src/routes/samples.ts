import express from 'express';
import { prisma } from '../utils/database.js';
import { logger } from '../utils/logger.js';

const router = express.Router();

// Get all samples with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search,
      type,
      status,
      projectId
    } = req.query;

    const skip = (Number(page) - 1) * Number(limit);
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search as string, mode: 'insensitive' } },
        { sampleId: { contains: search as string, mode: 'insensitive' } },
        { description: { contains: search as string, mode: 'insensitive' } }
      ];
    }

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (projectId) {
      where.projectId = projectId;
    }

    const [samples, total] = await Promise.all([
      prisma.sample.findMany({
        where,
        include: {
          project: {
            select: {
              id: true,
              name: true
            }
          },
          creator: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true
            }
          },
          libraries: {
            select: {
              id: true,
              libraryId: true,
              name: true,
              status: true
            }
          },
          _count: {
            select: {
              libraries: true,
              sequencingRuns: true,
              analysisResults: true
            }
          }
        },
        skip,
        take: Number(limit),
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.sample.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        samples,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          total,
          pages: Math.ceil(total / Number(limit))
        }
      }
    });
  } catch (error) {
    logger.error('Get samples error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch samples' }
    });
  }
});

// Get sample by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const sample = await prisma.sample.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            name: true,
            description: true,
            status: true
          }
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            department: true
          }
        },
        libraries: {
          include: {
            sequencingRuns: {
              select: {
                id: true,
                runId: true,
                name: true,
                status: true,
                platform: true
              }
            }
          }
        },
        sequencingRuns: {
          select: {
            id: true,
            runId: true,
            name: true,
            status: true,
            platform: true,
            startDate: true,
            endDate: true
          }
        },
        analysisResults: {
          select: {
            id: true,
            analysisId: true,
            name: true,
            type: true,
            status: true,
            createdAt: true
          }
        }
      }
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        error: { message: 'Sample not found' }
      });
    }

    res.json({
      success: true,
      data: { sample }
    });
  } catch (error) {
    logger.error('Get sample error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch sample' }
    });
  }
});

// Create new sample
router.post('/', async (req, res) => {
  try {
    const {
      sampleId,
      name,
      type,
      description,
      volume,
      concentration,
      storageLocation,
      barcodeId,
      expiryDate,
      projectId,
      creatorId
    } = req.body;

    // Check if sample ID already exists
    const existingSample = await prisma.sample.findUnique({
      where: { sampleId }
    });

    if (existingSample) {
      return res.status(400).json({
        success: false,
        error: { message: 'Sample ID already exists' }
      });
    }

    // Check if barcode ID already exists (if provided)
    if (barcodeId) {
      const existingBarcode = await prisma.sample.findUnique({
        where: { barcodeId }
      });

      if (existingBarcode) {
        return res.status(400).json({
          success: false,
          error: { message: 'Barcode ID already exists' }
        });
      }
    }

    const sample = await prisma.sample.create({
      data: {
        sampleId,
        name,
        type,
        description,
        volume,
        concentration,
        storageLocation,
        barcodeId,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        projectId,
        creatorId
      },
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    logger.info(`New sample created: ${sample.sampleId} by user ${creatorId}`);

    res.status(201).json({
      success: true,
      data: { sample }
    });
  } catch (error) {
    logger.error('Create sample error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to create sample' }
    });
  }
});

// Update sample
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // Convert date fields
    if (updateData.expiryDate) {
      updateData.expiryDate = new Date(updateData.expiryDate);
    }

    const sample = await prisma.sample.update({
      where: { id },
      data: updateData,
      include: {
        project: {
          select: {
            id: true,
            name: true
          }
        },
        creator: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    });

    logger.info(`Sample updated: ${sample.sampleId}`);

    res.json({
      success: true,
      data: { sample }
    });
  } catch (error) {
    logger.error('Update sample error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to update sample' }
    });
  }
});

// Delete sample
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Check if sample has associated libraries or sequencing runs
    const sample = await prisma.sample.findUnique({
      where: { id },
      include: {
        libraries: true,
        sequencingRuns: true,
        analysisResults: true
      }
    });

    if (!sample) {
      return res.status(404).json({
        success: false,
        error: { message: 'Sample not found' }
      });
    }

    if (sample.libraries.length > 0 || sample.sequencingRuns.length > 0 || sample.analysisResults.length > 0) {
      return res.status(400).json({
        success: false,
        error: { message: 'Cannot delete sample with associated libraries, sequencing runs, or analysis results' }
      });
    }

    await prisma.sample.delete({
      where: { id }
    });

    logger.info(`Sample deleted: ${sample.sampleId}`);

    res.json({
      success: true,
      data: { message: 'Sample deleted successfully' }
    });
  } catch (error) {
    logger.error('Delete sample error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to delete sample' }
    });
  }
});

// Get sample statistics
router.get('/stats/overview', async (req, res) => {
  try {
    const [
      totalSamples,
      samplesByStatus,
      samplesByType,
      recentSamples
    ] = await Promise.all([
      prisma.sample.count(),
      prisma.sample.groupBy({
        by: ['status'],
        _count: {
          status: true
        }
      }),
      prisma.sample.groupBy({
        by: ['type'],
        _count: {
          type: true
        }
      }),
      prisma.sample.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Last 7 days
          }
        }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalSamples,
        samplesByStatus,
        samplesByType,
        recentSamples
      }
    });
  } catch (error) {
    logger.error('Get sample stats error:', error);
    res.status(500).json({
      success: false,
      error: { message: 'Failed to fetch sample statistics' }
    });
  }
});

export default router;