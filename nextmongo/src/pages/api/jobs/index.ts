import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Job from "../../../models/Job";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {

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

       const { company, position,status,createdBy } = req.body
       if(!createdBy){
        return res.status(404).json({ error: "Please provide user" });
       }
        const job = await Job.create(
          req.body
        ); /* create a new model in the database */
        res.status(201).json({ data: job });
      } catch (error) {
        res.status(400).json({ message: `${error}` });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
