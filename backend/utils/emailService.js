const nodemailer = require("nodemailer");
require("dotenv").config();

// Configure Gmail SMTP transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS  // Your Gmail App Password
    }
});

// Function to send an email
const sendInvoiceEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Invoice Generator" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.messageId}`);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
    }
};

module.exports = sendInvoiceEmail;
