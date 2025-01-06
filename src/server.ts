import logger from "./utils/logger";
import mongoose from "mongoose";
import { app } from "./app";

// DATABASE
const DATABASE_URL = process.env.DATABASE_URL || "";

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    logger.info("DB: Connection has been established successfully");
  })
  .catch((error) => {
    logger.error("DB: Unable to connect to the database");
  });


// START WEB SERVER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
