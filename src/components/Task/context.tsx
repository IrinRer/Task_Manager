import { TRights } from 'constants/rights';
import { createContext, useMemo } from 'react';

export interface IRightsRole {
  role: TRights | '';
  isRights: boolean;
}

export const RightsRoleContext = createContext<IRightsRole | null>(null);

export const useRightsRoleContextValue = (
  role: TRights | '',
  isRights: boolean,
) => {
  return useMemo(() => ({ role, isRights }), [isRights, role]);
};
