import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import user from "../../../models/User";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case "POST":
      try {
        const pet = await user.create(
          {...req.body}
        ); /* create a new model in the database */
        // const token = user.createJWT();

        res.status(201).json({ user: { name: user.name } })
        res.status(201).json({ success: true, data: pet });
      } catch (error) {
       console.log(error)
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
