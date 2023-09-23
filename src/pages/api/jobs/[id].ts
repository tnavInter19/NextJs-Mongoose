import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/dbConnect";
import Job from "../../../models/Job";
import { protectAPI } from "@/middelware/authMiddleware";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET" /* Get a model by its ID */:
      try {
        const job = await Job.findById(id);
        if (!job) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT" /* Edit a model by its ID */:
      try {
        const job = await Job.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!job) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: job });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE" /* Delete a model by its ID */:
      try {
        const deletedJob = await Job.deleteOne({ _id: id });
        if (!deletedJob) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default protectAPI(handler);
