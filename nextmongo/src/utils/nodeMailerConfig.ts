import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport";

// Replace these with your actual SendGrid API key and email
const SENDGRID_API_KEY = "YOUR_SENDGRID_API_KEY";

// Create a Nodemailer transporter using the SendGrid transport
const transporter = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: SENDGRID_API_KEY,
    },
  })
);

export { transporter };
