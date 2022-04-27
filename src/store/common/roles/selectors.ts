import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
import { RootState } from 'store';
import { IRoles } from './types';

function isWatcherFromRoles(element: IRoles) {
  return element.task_role_id !== ROLES.watcher.id;
}

function isResponsibleFromRoles(element: IRoles) {
  return element.task_role_id !== ROLES.responsible.id;
}
function isImplementerFromRoles(element: IRoles) {
  return element.task_role_id !== ROLES.implementer.id;
}

const allroles = (state: RootState) => state.common.roles.allroles;

export const getWatcherRoleID = createSelector(
  allroles,
  (roles) => roles?.find(isWatcherFromRoles)?.task_role_id,
);
export const getResponsibleRoleID = createSelector(
  allroles,
  (roles) => roles?.find(isResponsibleFromRoles)?.task_role_id,
);
export const getImplementerRoleID = createSelector(
  allroles,
  (roles) => roles?.find(isImplementerFromRoles)?.task_role_id,
);

export const getRolesLoading = (state: RootState) => state.common.roles.loading;
export const getRolesError = (state: RootState) => state.common.roles.error;
