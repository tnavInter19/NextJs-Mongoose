import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import nodemailer from "nodemailer";
import crypto from "crypto";
import user from "../../../models/User";
import bcrypt from "bcryptjs";

export interface RegisterRequestBody {
  name?: string;
  email: string;
  password: string;
}

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "naveenthammisetty7@gmail.com",
    pass: "aeroslit",
  },
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const { name, email, password } = req.body as RegisterRequestBody;

        // Check if the username or email already exists
        const existingUser = await user.findOne({
          $or: [{ name }, { email }],
        });

        if (existingUser) {
          if (!existingUser.isOTPVerified) {
            const otp = crypto.randomInt(100000, 999999).toString();
            const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

            // Update the existing user with the new OTP and its expiration time
            existingUser.otp = otp;
            existingUser.otpExpiration = otpExpiration;
            await existingUser.save();

            // Send OTP via email
            const mailOptions = {
              from: "naveenthammisetty7@gmail.com",
              to: existingUser.email,
              subject: "Registration OTP",
              text: `Your OTP for registration is: ${otp}`,
            };

            await transporter.sendMail(mailOptions);

            return res.status(200).json({ message: "OTP sent successfully" });
          }

          return res
            .status(409)
            .json({ error: "Username or email already exists" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Generate OTP
        const otp = crypto.randomInt(100000, 999999).toString();
        const otpExpiration = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

        // Save OTP and user details to the database
        const newUser = new user({
          name,
          email,
          password: hashedPassword,
          otp,
          otpExpiration,
        });

        await newUser.save();

        // Send OTP via email
        const mailOptions = {
          from: "naveenthammisetty7@gmail.com",
          to: email,
          subject: "Registration OTP",
          text: `Your OTP for registration is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "User registered successfully" });
      } catch (error) {
        res.status(500).json({ error: "Server error" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
