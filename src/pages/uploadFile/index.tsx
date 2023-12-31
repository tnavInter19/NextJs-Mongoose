import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState } from "../../redux/store";
import { convertFileToBase64, downloadFile } from "../../utils/fileUtils";
import { postRequest } from "../../utils/api";
import Image from "next/image";

interface IFile {
  fileId: number;
  filename: string;
  size: number;
  contentType: string;
  content: string;
}

interface IFileUpload {
  files: IFile[];
  userId: string;
}
const FileUploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authToken = useSelector((state: RootState) => state.auth.token);
  const authId = useSelector((state: RootState) => state.auth.userId);
  const [fileUploads, setFileUploads] = useState<IFileUpload>();
  const fetchData = useCallback(async () => {
   try {
     const response = await fetch(`/api/fileUpload?userId=${authId}`);
     const data = await response.json();
     setFileUploads(data.fileUploads);
   } catch (error) {
     console.error('Error fetching file uploads:', error);
   }
 }, [authId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const fileData = await Promise.all(
      files.map(async (file) => {
        const content = await convertFileToBase64(file);
        return {
          filename: file.name,
          size: file.size,
          contentType: file.type,
          content,
        };
      })
    );

    const requestData = {
      authId,
      files: fileData,
    };

    postRequest("/api/fileUpload", requestData)
      .then((res) => {
       
        fetchData();
      })
      .catch((error) => {
        
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" multiple onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>

      <div>
        <h2>File Uploads for User {authId}</h2>
        {fileUploads && (
          <div>
            <ul>
              {fileUploads?.files?.map((file: IFile, index: number) => (
                <li key={index}>
                  <p>File Name: {file.filename}</p>
                  <p>File Size: {file.size} bytes</p>
                  <p>Content Type: {file.contentType}</p>
                  <Image
                    src={`${file.content}`}
                    alt={file.filename}
                    width={500} // Set the width of the image
                    height={500} // Set the height of the image
                  />
                  <button
                    onClick={() => downloadFile(file.content, file.filename)}
                  >
                    Download File
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;
