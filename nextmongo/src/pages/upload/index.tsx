// pages/upload.tsx
import { useState, ChangeEvent } from 'react';
import Link from "next/link";

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId',"64ba9c85dbb85ee7103add35");

    try {
      const response = await fetch('/api/file', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      <div>
      {/* Add a link to navigate to the download page */}
      <Link href={`/upload/64d3aed384fd9393eb1bdb24`}>Download File</Link>
    </div>
    </div>
  );
}
