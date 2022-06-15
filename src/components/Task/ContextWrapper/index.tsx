import React from 'react';
import {
  IRightsRole,
  RightsRoleContext,
  useRightsRoleContextValue,
} from '../context';

interface IProps extends IRightsRole {
  children: React.ReactNode;
}

const ContextWrapper: React.FC<IProps> = ({ role, isRights, children }) => {
  return (
    <RightsRoleContext.Provider
      value={useRightsRoleContextValue(role, isRights)}
    >
      {children}
    </RightsRoleContext.Provider>
  );
};

export default ContextWrapper;
