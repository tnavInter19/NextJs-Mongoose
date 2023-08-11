// pages/files.tsx
import { useEffect, useState } from 'react';

const FilesPage = () => {
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch('/api/upload', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setFiles(data.files);
        }
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  return (
    <div>
      <h1>Uploaded Files</h1>
      <ul>
        {files.map((filename, index) => (
          <li key={index}>{filename}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilesPage;
