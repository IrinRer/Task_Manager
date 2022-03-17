export const getBackendURL = (isAuth: boolean = false): string => {
  const {
    REACT_APP_TASK_AUTH_BACKEND_URL,
    REACT_APP_TASK_BACKEND_URL,
  } = process.env;
  return (isAuth
    ? REACT_APP_TASK_AUTH_BACKEND_URL
    : REACT_APP_TASK_BACKEND_URL) as string;
};
