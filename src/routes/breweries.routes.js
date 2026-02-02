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
 *     summary: List breweries
 */
router.get("/", listBreweries);

/**
 * @swagger
 * /breweries/{id}:
 *   get:
 *     summary: Get brewery by ID
 */
router.get("/:id", getBrewery);

/**
 * @swagger
 * /breweries:
 *   post:
 *     summary: Create brewery
 */
router.post("/", createBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   put:
 *     summary: Update brewery
 */
router.put("/:id", updateBrewery);

/**
 * @swagger
 * /breweries/{id}:
 *   delete:
 *     summary: Delete brewery
 */
router.delete("/:id", deleteBrewery);

export default router;
