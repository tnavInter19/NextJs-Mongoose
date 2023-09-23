// authMiddleware.ts
import { NextApiRequest, NextApiResponse } from "next";

// Middleware function to check the Authorization header
export const protectAPI = (handler: Function) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const authToken = req.headers.authorization;
    // Check if the Authorization header is present and matches the expected token
    if (authToken !== process.env.NEXT_PUBLIC_Auth_Token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Token is valid; call the API handler
    return handler(req, res);
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
