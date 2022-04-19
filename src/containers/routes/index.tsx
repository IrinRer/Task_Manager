import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import PrivateRoute from 'containers/Routes/PrivateRoute';
import ErrorBoundary from 'containers/ErrorBoundary';
import Error from 'components/Common/Error';
import Auth from 'pages/Auth';
import Preloader from 'components/Preloader';

const CreateRoutes: React.FC = () => {
  const Hello = lazy(() => import('components/Hello'));

  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader />}>
        <ErrorBoundary>
          <Routes>
            <Route
              index
              element={
                <PrivateRoute>
                  <Hello />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.editTask.path}
              element={
                <PrivateRoute>
                  <div>{ROUTES.editTask.name}</div>
                </PrivateRoute>
              }
            />
            <Route path={ROUTES.login.path} element={<Auth />} />
            <Route
              path={ROUTES.notFound.path}
              element={<Error text="Страница не найдена" />}
            />
          </Routes>
        </ErrorBoundary>
      </Suspense>
    </BrowserRouter>
  );
};

export default CreateRoutes;
