type TRouteNames = 'login' | 'tasks' | 'editTask' | 'notFound';

interface IRoute {
  path: string;
  route: string;
  name: string;
}

export const ROUTES: Record<TRouteNames, IRoute> = {
  tasks: {
    path: '/',
    route: '/',
    name: 'Задачи',
  },
  login: {
    path: '/auth',
    route: '/auth',
    name: 'Авторизация',
  },
  editTask: {
    path: '/edit',
    route: '/edit/:id',
    name: 'Редактирование задачи',
  },
  notFound: {
    path: '*',
    route: '*',
    name: '404',
  },
  // CHAT: {
  //   path: '/chat',
  //   route: '/chat',
  //   name: 'Чат',
  // },
};
