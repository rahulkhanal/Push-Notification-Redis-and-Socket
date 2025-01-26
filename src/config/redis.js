import { createClient } from "redis";

const redisClient = createClient();
redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));
(async () => {
    try {
        await redisClient.connect();
        console.log("✅ Connected to Redis");
    } catch (error) {
        console.error("❌ Failed to connect to Redis:", error);
        process.exit(1);
    }
})();

export default redisClient;