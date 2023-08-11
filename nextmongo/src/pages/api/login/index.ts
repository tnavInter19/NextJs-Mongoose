import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../../../models/User";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  name: string;
  userId:string;
  token: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      const { email, password } = req.body as LoginRequestBody;

      // In a real application, you would fetch the user from the database based on the provided email.
      // For this example, we will use a dummy user object.
      const user: IUser | null = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      try {
        // Check if the provided email exists and the password matches the stored hash.
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          res.status(401).json({ error: "Invalid email or password" });
        }

        // Create a JWT token for the user.
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET || "",
          { expiresIn: "1d" }
        );

        res
          .status(200)
          .json({ name: user.name ,userId: user.id ,token } as LoginResponseBody);
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
