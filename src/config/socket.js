import { Server } from "socket.io";
import redisClient from "./redis.js";

let io;

export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: { origin: "*", methods: ["GET", "POST"] }
    });

    io.on("connection", (socket) => {
        console.log(`🔌 Socket ${socket.id} connected.`);

        socket.on("register", async (data) => {
            if (!data?.userId) return;
            await redisClient.sAdd(`user:${data.userId}:sockets`, socket.id);
        });

        socket.on("disconnect", async () => {
            const keys = await redisClient.keys("user:*:sockets");
            for (const key of keys) {
                await redisClient.sRem(key, socket.id);
            }
        });
    });
};

export const getIO = () => io;