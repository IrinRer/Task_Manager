import { TRights } from 'constants/rights';
import { ROLES } from 'constants/types/common';
import { createContext, useMemo } from 'react';

export interface IRightsRole {
  role: TRights;
  isRights: boolean;
}

export const RightsRoleContext = createContext<IRightsRole>({
  role: ROLES.any,
  isRights: false,
});

export const useRightsRoleContextValue = (role: TRights, isRights: boolean) => {
  return useMemo(() => ({ role, isRights }), [isRights, role]);
};
