import { createContext, useContext, useMemo } from 'react';
import { TRights } from './rights';
import { TTask } from './types/common';

export const TaskContext = createContext<TTask | null>(null);

interface IRightsRole {
  role: TRights | '';
  isRights: boolean;
}

export const RightsRoleContext = createContext<IRightsRole | null>(null);

export const RoleContext = () => {
  return useContext(RightsRoleContext)?.role || '';
};
export const EditableContext = () => {
  return useContext(RightsRoleContext)?.isRights || false;
};

export const useRightsRoleContextValue = (role: TRights, isRights: boolean) => {
  return useMemo(() => ({ role, isRights }), [isRights, role]);
};
