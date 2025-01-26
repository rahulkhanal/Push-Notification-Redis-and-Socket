import { notify } from "../services/notificationService.js";

export const sendMessage = async (req, res) => {
    const { userId, message } = req.body;
    if (!userId || !message) return res.status(400).json({ error: "Missing parameters" });
    await notify(userId, message);
    res.json({ success: true, message: "Notification sent" });
};