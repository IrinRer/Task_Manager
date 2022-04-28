import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
import { RootState } from 'store';
import { IRoles } from './types';

function getWatcherFromRoles(element: IRoles) {
  if (element.name !== ROLES.watcher.name) {
    return false;
  }
  return element;
}

function getResponsibleFromRoles(element: IRoles) {
  if (element.name !== ROLES.responsible.name) {
    return false;
  }
  return element;
}
function getImplementerFromRoles(element: IRoles) {
  if (element.name !== ROLES.implementer.name) {
    return false;
  }
  return element;
}

const allroles = (state: RootState) => state.common.roles.allroles;

export const getWatcherRoleID = createSelector(
  allroles,
  (roles) => roles?.find(getWatcherFromRoles)?.task_role_id,
);
export const getResponsibleRoleID = createSelector(
  allroles,
  (roles) => roles?.find(getResponsibleFromRoles)?.task_role_id,
);
export const getImplementerRoleID = createSelector(
  allroles,
  (roles) => roles?.find(getImplementerFromRoles)?.task_role_id,
);

export const getRolesLoading = (state: RootState) => state.common.roles.loading;
export const getRolesError = (state: RootState) => state.common.roles.error;
