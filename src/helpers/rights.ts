/* export const getIsTaskEditable = createSelector(
  getTaskAuthor,
  getTaskImplementer,
  getTaskResponsible,
  getVerifyIdUser,
  (author, implementer, responsible, authUserId): boolean => {
    return !![author, implementer, responsible].find(
      (user) => user?.user_id === authUserId,
    );
  },
); */

import { RIGHTS } from 'constants/task';

export const getRights = (userRole: string, element: string): boolean => {
  return RIGHTS[element].includes(userRole) || RIGHTS[element].includes('any');
};
