import { RIGHTS, TRights, RIGHTS_NAMES } from 'constants/rights';

export const getRights = (
  userRole: TRights,
  element: RIGHTS_NAMES,
): boolean => {
  return RIGHTS[element].includes(userRole);
};
