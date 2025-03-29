const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    }
});

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
