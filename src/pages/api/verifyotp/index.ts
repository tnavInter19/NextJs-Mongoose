import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../lib/dbConnect";
import user from "../../../models/User";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(400).json({ success: false });
  }

  try {
    await dbConnect();
    const { email, otp } = req.body;

    // Find the user with the provided email
    const User = await user.findOne({ email });

    if (!User) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the OTP is valid and not expired
    const currentTime = new Date();
    if (User.otp !== otp || User.otpExpiration < currentTime) {
      return res.status(401).json({ error: 'Invalid OTP or OTP expired' });
    }

    // If OTP is valid, update the user to mark the OTP as verified
    User.isOTPVerified = true;
    await User.save();

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}
