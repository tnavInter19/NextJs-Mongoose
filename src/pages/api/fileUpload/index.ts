import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from "../../../lib/dbConnect";
import FileUpload  from '../../../models/FileUpload';
import User from "../../../models/User";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 if (req.method === 'GET') {
  try {
    await dbConnect(); // Ensure the database connection is established

    const { userId } = req.query;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const fileUploads = await FileUpload.findOne({ userId });

    res.status(200).json({ fileUploads });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching file uploads' });
  }
 }
  else if (req.method === 'POST') {
    try {
      const { authId, files } = req.body;

      const allowedContentTypes = ['image/jpeg', 'image/png'];
      const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  
      
      for (const file of files) {
        if (!allowedContentTypes.includes(file.contentType)) {
          return res.status(400).json({ error: 'Invalid file content type' });
        }
  
        if (file.size > maxSizeInBytes) {
          return res.status(400).json({ error: 'File size exceeds the limit' });
        }
       }

      await dbConnect(); // Ensure the database connection is established

      const user = await User.findById(authId);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const existingFileUpload = await FileUpload.findOne({ userId: authId });

      if (!existingFileUpload) {
        // Create a new FileUpload document if one doesn't exist
        const newFileUpload = new FileUpload({
          files: files.map((file: any, index: number) => ({
            fileId: index + 1,
            ...file,
          })),
          userId: authId,
        });
        await newFileUpload.save();
      } else {
        // Append new files to the existing files
        const lastFileId =
          existingFileUpload.files.length > 0
            ? existingFileUpload.files[existingFileUpload.files.length - 1].fileId
            : 0;
            
        existingFileUpload.files.push(
         ...files.map((file: any, index: number) => ({
           fileId: lastFileId + index + 1,
           ...file,
         }))
       );

       await existingFileUpload.save();
        }
      res.status(201).json({ message: 'Files uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error uploading files' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
