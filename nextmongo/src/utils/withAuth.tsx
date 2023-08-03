import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const withAuth = (WrappedComponent: React.FC) => {
  const ProtectedPage: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <p>Loading...</p>;
    }

    return <WrappedComponent />;
  };

  return ProtectedPage;
};

export default withAuth;
