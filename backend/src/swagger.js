import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

export function setupSwagger(app) {
  const spec = swaggerJSDoc({
    definition: {
      openapi: "3.0.0",
      info: { title: "Mini-Project 3 API", version: "1.0.0" },
    },
    apis: ["./src/routes/*.js"],
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
}
