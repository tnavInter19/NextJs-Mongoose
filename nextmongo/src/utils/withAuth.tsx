import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Loading from "@/components/loading";

const withAuth = (WrappedComponent: React.FC<Props>) => {
  const ProtectedPage: React.FC<Props> = (props) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login');
      }
    }, [isAuthenticated]);

    if (!isAuthenticated) {
      return <Loading />;
    }
    return <WrappedComponent {...props} />;
  };

  return ProtectedPage;
};

export default withAuth;
