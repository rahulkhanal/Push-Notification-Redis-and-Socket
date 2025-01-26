import { createServer } from "http";
import app from "./index.js";
import { initializeSocket } from "./config/socket.js";

const PORT = 3030;
const server = createServer(app);
initializeSocket(server);
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));