import Brewery from "../models/Brewery.js";
import { z } from "zod";

const createSchema = z.object({
  name: z.string().min(1),
  breweryType: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  websiteUrl: z.string().url().optional(),
});

export async function listBreweries(req, res, next) {
  try {
    const { state, city, limit = 25 } = req.query;
    const filter = {};
    if (state) filter.state = state;
    if (city) filter.city = city;

    const breweries = await Brewery.find(filter)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json(breweries);
  } catch (e) {
    next(e);
  }
}

export async function getBrewery(req, res, next) {
  try {
    const brewery = await Brewery.findById(req.params.id);
    if (!brewery) return res.status(404).json({ message: "Not found" });
    res.json(brewery);
  } catch (e) {
    next(e);
  }
}

export async function createBrewery(req, res, next) {
  try {
    const payload = createSchema.parse(req.body);
    const brewery = await Brewery.create(payload);
    res.status(201).json(brewery);
  } catch (e) {
    next(e);
  }
}

export async function updateBrewery(req, res, next) {
  try {
    const payload = createSchema.partial().parse(req.body);
    const brewery = await Brewery.findByIdAndUpdate(
      req.params.id,
      { $set: payload },
      { new: true }
    );
    if (!brewery) return res.status(404).json({ message: "Not found" });
    res.json(brewery);
  } catch (e) {
    next(e);
  }
}

export async function deleteBrewery(req, res, next) {
  try {
    const brewery = await Brewery.findByIdAndDelete(req.params.id);
    if (!brewery) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted", id: req.params.id });
  } catch (e) {
    next(e);
  }
}
