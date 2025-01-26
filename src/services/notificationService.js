import redisClient from "../config/redis.js";
import { getIO } from "../config/socket.js";

export const notify = async (userId, message) => {
    const sockets = await redisClient.sMembers(`user:${userId}:sockets`);
    const io = getIO();
    sockets.forEach(socketId => {
        io.to(socketId).emit("notification", { message });
    });
};