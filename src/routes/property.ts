import express from 'express';
import { authMiddleware } from '../middlewares/auth';
import {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty
} from '../controllers/property';

const router = express.Router();

/**
 * @swagger
 * /api/properties:
 *   post:
 *     summary: Create a new property
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Properties
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', authMiddleware, createProperty);

/**
 * @swagger
 * /api/properties:
 *   get:
 *     summary: Get all properties
 *     tags:
 *       - Properties
 *     responses:
 *       200:
 *         description: List of properties
 *       500:
 *         description: Internal server error
 */
router.get('/', getAllProperties);

/**
 * @swagger
 * /api/properties/{id}:
 *   put:
 *     summary: Update a property by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated
 *       400:
 *         description: Bad request
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.put('/:id', authMiddleware, updateProperty);

/**
 * @swagger
 * /api/properties/{id}:
 *   delete:
 *     summary: Delete a property by ID
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Properties
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Property ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Property deleted
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Property not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authMiddleware, deleteProperty);

export default router;
