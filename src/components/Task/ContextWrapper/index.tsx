import React from 'react';
import {
  IRightsRole,
  RightsRoleContext,
  useRightsRoleContextValue,
} from '../context';

interface IProps {
  children: React.ReactNode;
}

const ContextWrapper: React.FC<IRightsRole & IProps> = ({
  role,
  isRights,
  children,
}) => {
  return (
    <RightsRoleContext.Provider
      value={useRightsRoleContextValue(role, isRights)}
    >
      {children}
    </RightsRoleContext.Provider>
  );
};

export default ContextWrapper;
