import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const FileDownloadPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [downloadUrl, setDownloadUrl] = useState('');

  useEffect(() => {
    const fetchDownloadUrl = async () => {
      try {
        const response = await fetch(`/api/file/${id}`);
        if (!response.ok) {
          throw new Error('Error fetching download URL');
        }
        const data = await response.json();
        setDownloadUrl(data.downloadUrl);
      } catch (error) {
        console.error('Error fetching download URL:', error);
      }
    };

    fetchDownloadUrl();
  }, [id]);

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  return (
    <div>
      <h1>File Download Page</h1>
      <p>File ID: {id}</p>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default FileDownloadPage;
