import React, { ReactElement } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import {
  getVerifyError,
  getVerifyIdUser,
  getVerifyLoading,
} from 'store/auth/verify/selectors';
import {
  getAuthError,
  getAuthLoading,
  getVerifyToken,
} from 'store/auth/token/selectors';
import Preloader from 'components/Common/Preloader';
import { getToken } from 'helpers/cookies';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const verifyLoading = useAppSelector(getVerifyLoading);
  const authLoading = useAppSelector(getAuthLoading);
  const loading = verifyLoading || authLoading;
  const verifyToken = useAppSelector(getVerifyToken);
  const userID = useAppSelector(getVerifyIdUser);
  const token = getToken();
  const verifyError = useAppSelector(getVerifyError);
  const authError = useAppSelector(getAuthError);
  const error = verifyError || authError;
  // const [isBeenLoad, setIsBeenLoad] = useState<boolean>(false);

  /* if (loading && !isBeenLoad) {
    setIsBeenLoad(true);
  } */

  if (
    error ||
    !token /* (!loading && isBeenLoad && !userID && !verifyToken) */
  ) {
    return <Navigate to={ROUTES.login.path} />;
  }

  if (loading || (!verifyToken && userID)) {
    return <Preloader size="large" />;
  }

  return <>{verifyToken ? Component : null}</>;

  /* return (
    <>
      {loading ? (
        <Preloader size="large" />
      ) : verifyToken ? (
        Component
      ) : (
        <Preloader size="large" />
      )}
    </>
  ); */
};

export default PrivateRoute;
