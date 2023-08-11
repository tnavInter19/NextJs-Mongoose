import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { convertFileToBase64,downloadFile } from '@/utils/fileUtils';
import { postRequest } from "@/utils/api";

const FileUploadForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const authToken = useSelector((state : RootState) => state.auth.token);
  const authId = useSelector((state : RootState) => state.auth.userId);
  const [fileUploads, setFileUploads] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/fileUpload?userId=${authId}`);
      const data = await response.json();
      setFileUploads(data.fileUploads);
    } catch (error) {
      console.error('Error fetching file uploads:', error);
    }
  };
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

    postRequest("/api/fileUpload", requestData, isLoggedIn, authToken!)
    .then((res) => {
     console.log('Files uploaded successfully');
    })
    .catch((error) => {
     console.log(error.message)
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
      <ul>
        {fileUploads.map((fileUpload) => (
          <li key={fileUpload._id}>
            <p>Upload Date: {new Date(fileUpload.createdAt).toLocaleString()}</p>
            <ul>
              {fileUpload.files.map((file, index) => (
                <li key={index}>
                  <p>File Name: {file.filename}</p>
                  <p>File Size: {file.size} bytes</p>
                  <p>Content Type: {file.contentType}</p>
                  <img src={`${file.content}`} alt={file.filename} />
                  <button
                    onClick={() =>
                      downloadFile(file.content, file.filename)
                    }
                  >
                    Download File
                  </button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default FileUploadForm;
