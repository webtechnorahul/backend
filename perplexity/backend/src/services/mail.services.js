import nodemailer from 'nodemailer';
import 'dotenv/config';
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: 'OAuth2',
        user: process.env.GOOGLE_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        // Optional: access token manually handle karne ki zaroorat nahi, 
        // Nodemailer refresh token se khud naya mangwa leta hai.
    }
});

// Verification check
transporter.verify((error, success) => {
    if (error) {
        console.log("SMTP Verification Error:", error);
    } else {
        console.log("Server is ready to send our messages");
    }
});

export async function sendEmail({ to, subject, html, text="" }) {
    // try {
        const mailOptions = {
            from: `perplexity clone <${process.env.GOOGLE_USER}>`, // professional format
            to,
            subject,
            html,
            text
        };
        const details = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", details.messageId);
        return "send email successfully to:- "+to;
    // } catch (error) {
    //     console.error("Error sending email:", error);
    //     throw error; // controller tak error pahuchane ke liye
    // }
}