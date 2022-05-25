import { RIGHTS } from 'constants/task';

export const getRights = (userRole: string, element: string): boolean => {
  return RIGHTS[element].includes(userRole) || RIGHTS[element].includes('any');
};
