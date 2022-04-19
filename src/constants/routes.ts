type TRouteNames = 'login' | 'tasks' | 'editTask' | 'notFound';

interface IRoute {
  path: string
  name: string;
}

export const ROUTES: Record<TRouteNames, IRoute> = {
  tasks: {
    path: '/',
    name: 'Задачи',
  },
  login: {
    path: '/auth',
    name: 'Авторизация',
  },
  editTask: {
    path: '/edit-task',
    name: 'Редактирование задачи',
  },
  notFound: {
    path: '*',
    name: '404',
  },
  // CHAT: {
  //   path: '/chat',
  //   name: 'Чат',
  // },
};
