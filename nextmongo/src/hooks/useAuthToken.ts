import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useAuthToken = () => {
  return useSelector((state: RootState) => state.auth.token);
};
