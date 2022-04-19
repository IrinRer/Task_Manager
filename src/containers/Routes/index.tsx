import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import PrivateRoute from 'containers/Routes/PrivateRoute';
import Spinner from 'components/Common/Spinner';
import ErrorBoundary from 'containers/ErrorBoundary';
import Error from 'components/Common/Error';

const CreateRoutes: React.FC = () => {
  // const Tasks = lazy(() => import('components/Tasks'));
  const Task = lazy(() => import('pages/Tasks/Task'));

  return (
    <BrowserRouter>
      <Suspense fallback={<Spinner />}>
        <ErrorBoundary>
          <Routes>
            <Route
              index
              element={
                <PrivateRoute>
                  <div>{ROUTES.tasks.name}</div>
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.editTask.path}
              element={
                <PrivateRoute>
                  <Task />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.login.path}
              element={<div>{ROUTES.login.name}</div>}
            />
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
