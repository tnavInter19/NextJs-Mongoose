import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export const useIsLoggedIn = () => {
  return useSelector((state: RootState) => state.auth.isLoggedIn);
};
