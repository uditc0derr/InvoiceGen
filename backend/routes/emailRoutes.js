const express = require("express");
const sendInvoiceEmail = require("../utils/emailService");

const router = express.Router();

router.post("/send-email", async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await sendInvoiceEmail(to, subject, text, html);
        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error sending email", error: error.message });
    }
});

module.exports = router;
