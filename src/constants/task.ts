type TRolesNames = 'watcher' | 'responsible' | 'implementer' | 'author';

interface IRole {
  id: string
  name: string;
}

export const ROLES: Record<TRolesNames, IRole> = {
  watcher: {
    id: '25615bc6-9762-4578-b1d9-de28a059d682',
    name: 'Наблюдатель',
  },
  responsible: {
    id: '57a5360b-7c3b-4de0-b536-a5657ac7da32',
    name: 'Ответственный',
  },
  implementer: {
    id: '4fca475d-488e-4261-8e60-44569071a038',
    name: 'Исполнитель',
  },
  author: {
    id: '4601c660-f319-4728-80a6-0aaac03f3842',
    name: 'Автор задачи',
  },
};