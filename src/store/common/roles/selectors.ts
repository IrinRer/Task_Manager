import { createSelector } from '@reduxjs/toolkit';
import { ROLES } from 'constants/task';
import { RootState } from 'store';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import {
  getTaskAuthorID,
  getTaskImplementersID,
  getTaskResponsibleID,
  getTaskWatchersID,
} from 'store/editTask/selectors';
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

export const getRolesLoading = (state: RootState) => state.common.roles.loading;
export const getRolesError = (state: RootState) => state.common.roles.error;

export const getMyRolesForTask = createSelector(
  getTaskAuthorID,
  getTaskImplementersID,
  getTaskResponsibleID,
  getTaskWatchersID,
  getVerifyIdUser,
  (author, implementers, responsible, watchers, authUserId): string[] => {
    const resultRoles: string[] = [];

    [
      { name: ROLES.author, data: [author] },
      { name: ROLES.implementer, data: implementers },
      { name: ROLES.responsible, data: [responsible] },
      { name: ROLES.watcher, data: watchers },
    ].forEach((el) => {
      if (el.data.includes(authUserId || undefined)) {
        resultRoles.push(el.name);
      }
    });
    return resultRoles;
  },
);

export const getMyMaxRoleForTask = createSelector(
  getMyRolesForTask,
  (roles): string => {
    switch (true) {
      case roles.includes(ROLES.author):
        return ROLES.author;
        break;
      case roles.includes(ROLES.responsible):
        return ROLES.responsible;
        break;
      case roles.includes(ROLES.implementer):
        return ROLES.implementer;
        break;
      case roles.includes(ROLES.watcher):
        return ROLES.watcher;
        break;
      default:
        return 'any';
    }
  },
);
