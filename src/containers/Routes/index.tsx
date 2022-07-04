import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import ErrorBoundary from 'containers/ErrorBoundary';
import Error from 'components/Common/Error';
import Auth from 'pages/Auth';
import PrivateRoute from 'containers/Routes/PrivateRoute';
import Preloader from 'components/Common/Preloader';
import { useWindowSize } from 'customHooks/useWindowSize';
import { MIN_DESKTOP_WIDTH } from 'constants/common';

const CreateRoutes: React.FC = () => {
  const size = useWindowSize();

  const Home = lazy(() => import('pages/Home'));
  const Task = lazy(() => import('pages/Tasks/Task'));

  return (
    <BrowserRouter>
      <Suspense fallback={<Preloader size="large" />}>
        <ErrorBoundary>
          <Routes>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.editTask.route}
              element={
                <PrivateRoute>
                  <>
                    {(size.width || 0) >= MIN_DESKTOP_WIDTH && <Home />}
                    <Task />
                  </>
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
