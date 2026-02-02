import { Router } from "express";
import {
  listBreweries,
  getBrewery,
  createBrewery,
  updateBrewery,
  deleteBrewery,
} from "../controllers/breweries.controller.js";

const router = Router();

/**
 * @swagger
 * /breweries:
 *   get:
 *     summary: List breweries from MongoDB
 *     parameters:
 *       - in: query
 *         name: state
 *         schema: { type: string }
 *       - in: query
 *         name: city
 *         schema: { type: string }
 *       - in: query
 *         name: q
 *         schema: { type: string }
 *       - in: query
 *         name: limit
 *         schema: { type: number }
 *       - in: query
 *         name: page
 *         schema: { type: number }
 *     responses:
 *       200:
 *         description: Paginated breweries
 */
router.get("/", listBreweries);

/**
 * @swagger
 * /breweries/{id}:
 *   get:
 *     summary: Get a brewery by MongoDB ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Brewery }
 *       404: { description: Not found }
 */
router.get("/:id", getBrewery);

/**
 * @swagger
 * /breweries:
 *   post:
 *     summary: Create a brewery (local-only)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name]
 *             properties:
 *               name: { type: string }
 *               breweryType: { type: string }
 *               city: { type: string }
 *               state: { type: string }
 *               country: { type: string }
 *               websiteUrl: { type: string }
 *     responses:
 *       201: { description: Created }
 */
router.post("/", createBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   put:
 *     summary: Update a brewery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               breweryType: { type: string }
 *               city: { type: string }
 *               state: { type: string }
 *               country: { type: string }
 *               websiteUrl: { type: string }
 *     responses:
 *       200: { description: Updated }
 *       404: { description: Not found }
 */
router.put("/:id", updateBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   delete:
 *     summary: Delete a brewery
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: Deleted }
 *       404: { description: Not found }
 */
router.delete("/:id", deleteBrewery);

export default router;
