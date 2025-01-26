// import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
// import cors from "cors";
// import { createClient } from "redis";

// const PORT = 3030;

// const redisClient = createClient();

// redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));

// (async () => {
//     try {
//         await redisClient.connect();
//         console.log("✅ Connected to Redis");
//     } catch (error) {
//         console.error("❌ Failed to connect to Redis:", error);
//         process.exit(1);
//     }
// })();

// const app = express();
// app.use(cors());

// const httpServer = createServer(app);

// const io = new Server(httpServer, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     },
// });

// io.on("connection", (socket) => {
//     console.log(`🔌 Socket ${socket.id} connected.`);

//     socket.on("register", async (data) => {
//         try {
//             if (!data?.userId) {
//                 console.warn("⚠️ Register event received with missing userId.");
//                 return;
//             }
//             const key = `user:${data.userId}:sockets`;
//             await redisClient.sAdd(key, socket.id);
//             console.log(`✅ User ${data.userId} registered with socket ${socket.id}`);
//         } catch (error) {
//             console.error("❌ Error in register event:", error);
//         }
//     });

//     socket.on("disconnect", async () => {
//         try {
//             const keys = await redisClient.keys("user:*:sockets");
//             console.log(keys);
//             for (const key of keys) {
//                 await redisClient.sRem(key, socket.id);
//             }
//             console.log(`🚪 Socket ${socket.id} disconnected.`);
//         } catch (error) {
//             console.error("❌ Error during socket disconnect:", error);
//         }
//     });
// });

// process.on("SIGINT", async () => {
//     console.log("🛑 Server shutting down...");
//     try {
//         await redisClient.disconnect();
//         console.log("✅ Redis disconnected.");
//     } catch (error) {
//         console.error("❌ Error disconnecting Redis:", error);
//     }
//     process.exit(0);
// });

// httpServer.listen(PORT, () => {
//     console.log(`🚀 The server is running on port ${PORT}`);
// });
