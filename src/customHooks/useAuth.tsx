import { useSelector } from 'react-redux';
import { getToken } from 'store/auth/selectors';

const useAuth = () => {
  return !!useSelector(getToken);
};
export default useAuth;
