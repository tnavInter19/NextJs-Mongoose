import mongoose, { Types } from "mongoose";

const fileUploadSchema = new mongoose.Schema({
  files: [
    {
      fileId: { type: Number, required: true },
      filename: { type: String, required: [true, "File name is required"] },
      size: { type: Number, required: true },
      contentType: { type: String, required: true },
      content: { type: String, required: [true, "File content is required"] },
    },
  ],
  userId: {
    type: Types.ObjectId,
    ref: "User",
    required: [true, "Please provide user"],
  },
});

export default mongoose.models.FileUpload || mongoose.model('FileUpload', fileUploadSchema)

