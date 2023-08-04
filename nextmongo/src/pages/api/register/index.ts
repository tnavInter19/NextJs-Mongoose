import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import user from "../../../models/User";


export interface RegisterRequestBody {
 username:string;
 email: string;
 password: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
     try {
      const { username, email, password } = req.body as RegisterRequestBody;
  
      // Check if the username or email already exists
      const existingUser = await user.findOne({
        $or: [{ username }, { email }],
      });
  
      if (existingUser) {
        return res.status(409).json({ error: 'Username or email already exists' });
      }
  
      // Create a new user
      const newUser = new user({ username, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
