import app from "./app";
import { connectDB } from "./db/connection";
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app
    .listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    })
    .on("error", (err) => {
      console.error("Error starting server:", err);
    });
};

startServer();

// Later change the console.logs to logger
