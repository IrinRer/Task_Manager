import { RIGHTS } from 'constants/rights';

export const getRights = (userRole: string, element: string): boolean => {
  return RIGHTS[element].includes(userRole) || RIGHTS[element].includes('any');
};
