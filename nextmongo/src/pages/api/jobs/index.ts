import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Job from "../../../models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
   // Check if the request includes the authorization token
   if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Replace 'your_auth_token' with the actual authentication token sent from the client
  const authToken = 'your_auth_token';
  // You should handle token verification, e.g., verify the token using JWT or other authentication mechanisms

  if (authToken !== 'your_auth_token') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const jobs = await Job.find({}); /* find all the data in our database */
        res.status(200).json({ success: true, data: jobs });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const job = await Job.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
