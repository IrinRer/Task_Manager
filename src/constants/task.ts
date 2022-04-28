type TRolesNames = 'watcher' | 'responsible' | 'implementer' | 'author';

interface IRole {
  name: string;
}

export const ROLES: Record<TRolesNames, IRole> = {
  watcher: {
    name: 'Наблюдатель',
  },
  responsible: {
    name: 'Ответственный',
  },
  implementer: {
    name: 'Исполнитель',
  },
  author: {
    name: 'Автор задачи',
  },
};
