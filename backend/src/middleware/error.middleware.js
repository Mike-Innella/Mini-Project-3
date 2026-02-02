export function errorHandler(err, req, res, next) {
  // Zod validation errors
  if (err?.name === "ZodError") {
    return res.status(400).json({
      message: "Validation error",
      issues: err.issues,
    });
  }

  // Mongoose bad ObjectId
  if (err?.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  console.error(err);
  res.status(500).json({ message: "Server error" });
}
