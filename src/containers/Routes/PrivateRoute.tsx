import React, { ReactElement } from 'react';
import { useAppSelector } from 'customHooks/redux/useAppSelector';
import { getTasksAuth } from 'store/tasks/selectors';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';

interface IRouteProps {
  children: ReactElement;
}

const PrivateRoute: React.FC = ({ children: Component }: IRouteProps) => {
  const isAuthenticated = useAppSelector(getTasksAuth); 
  if(isAuthenticated) {
    return Component
  }
  return <Navigate to={ROUTES.login.path}/>
}


export default PrivateRoute;