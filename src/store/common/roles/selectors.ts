import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import { IRoles } from './types';

function isAuthorFromRoles(element: IRoles): boolean {
  return element.name === ROLES.author;
}

function isWatcherFromRoles(element: IRoles): boolean {
  return element.name === ROLES.watcher;
}

function isResponsibleFromRoles(element: IRoles): boolean {
  return element.name === ROLES.responsible;
}
function isImplementerFromRoles(element: IRoles): boolean {
  return element.name === ROLES.implementer;
}

function isAuthorFromRoles(element: IRoles): boolean {
  return element.name === ROLES.author;
}

const allroles = (state: RootState) => state.common.roles.allroles;

export const getAuthorRoleID = createSelector(
  allroles,
  (roles) => roles?.find(isAuthorFromRoles)?.task_role_id,
);

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
export const getAuthorRoleID = createSelector(
  allroles,
  (roles) => roles?.find(isAuthorFromRoles)?.task_role_id,
);

export const getRolesLoading = (state: RootState) => state.common.roles.loading;
export const getRolesError = (state: RootState) => state.common.roles.error;
