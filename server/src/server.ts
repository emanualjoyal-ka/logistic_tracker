import { createServer } from "node:http";
import app from "./app.js";
import { env } from "./config/env.js";
import prisma from "./lib/prisma.js";
import { initializeSocket } from "./lib/socket.js";
import { getIO } from "./lib/socket.js";
import {registerTrackingSocket} from "./modules/tracking/tracking.socket.js";

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
    const httpServer = createServer(app);
    initializeSocket(httpServer);
    httpServer.listen(env.PORT, () => {
      console.log(`Server running on http://localhost:${env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();