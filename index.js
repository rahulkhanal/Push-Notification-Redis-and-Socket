import express from 'express';
const app = express();
import { createClient } from 'redis';
const port = 9099;
import { Server } from "socket.io";
import { createServer } from "http";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

const redisClient = await createClient()
    .on('error', err => console.log('Redis Client Error', err))
    .connect()
    .then(() => console.log('Connected to Redis'));

io.on("connection", (socket) => {
    // 📌 Handle new connection
    console.log(`⚡ New connection: ${socket.id}`);
    socket.on("register", async (userId) => {
        const key = `user:${userId}:sockets`;
        await redisClient.sAdd(key, socket.id);
        console.log(`✅ User ${userId} added with socket ${socket.id}`);
    });

    // 📌 Handle disconnection
    socket.on("disconnect", async () => {
        for await (const key of redisClient.keys("user:*:sockets")) {
            await redisClient.sRem(key, socket.id);
        }
        console.log(`🚪 Socket ${socket.id} disconnected.`);
    });
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 