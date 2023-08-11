import nodemailer from "nodemailer";
import nodemailerSendgrid from "nodemailer-sendgrid";

// Replace these with your actual SendGrid API key and email
const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY";

// Create a Nodemailer transporter using the SendGrid transport
const transporter = nodemailer.createTransport(
 nodemailerSendgrid({
  apiKey: SENDGRID_API_KEY
})
);

export { transporter };
