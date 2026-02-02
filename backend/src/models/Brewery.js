import mongoose from "mongoose";

const brewerySchema = new mongoose.Schema(
  {
    externalId: { type: String, unique: true, index: true, sparse: true },
    name: { type: String, required: true },
    breweryType: String,
    city: String,
    state: String,
    country: String,
    websiteUrl: String,
  },
  { timestamps: true }
);

const Brewery = mongoose.model("Brewery", brewerySchema);
export default Brewery;
