import { createSelector } from '@reduxjs/toolkit';
import { TRights } from 'constants/rights';
import { ROLES } from 'constants/types/common';
import { RootState } from 'store';
import { getVerifyIdUser } from 'store/auth/verify/selectors';
import {
  getTaskAuthorID,
  getTaskImplementersID,
  getTaskResponsibleID,
  getTaskWatchersID,
} from 'store/editTask/selectors';
import {
  getTasksAuthorsIDS,
  getTasksImplementersIDS,
  getTasksResponsiblesIDS,
  getTasksWatchersIDS,
} from 'store/tasks/selectors';
import { IRoles, TasksMaxRole, TasksRoles } from './types';

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
    const usersIDwithRolesForTask = [
      { name: ROLES.author, data: [author] },
      { name: ROLES.implementer, data: implementers },
      { name: ROLES.responsible, data: [responsible] },
      { name: ROLES.watcher, data: watchers },
    ];

    usersIDwithRolesForTask.forEach((el) => {
      if (el.data.includes(authUserId || undefined)) {
        resultRoles.push(el.name);
      }
    });
    return resultRoles;
  },
);

export const getMyMaxRoleForTask = createSelector(
  getMyRolesForTask,
  (roles): TRights => {
    if (roles.includes(ROLES.author)) return ROLES.author;
    if (roles.includes(ROLES.responsible)) return ROLES.responsible;
    if (roles.includes(ROLES.implementer)) return ROLES.implementer;
    if (roles.includes(ROLES.watcher)) return ROLES.watcher;
    return ROLES.any;
  },
);

export const findTaskRoleELem = (rolesArr: TasksRoles[], task_id: string) => {
  return rolesArr.find((role_el) => {
    return role_el.task_id === task_id;
  });
};

export const getMyRolesForAllTasks = createSelector(
  getTasksAuthorsIDS,
  getTasksImplementersIDS,
  getTasksResponsiblesIDS,
  getTasksWatchersIDS,
  getVerifyIdUser,
  (authors, implementers, responsibles, watchers, authUserId): TasksRoles[] => {
    const resultRoles: TasksRoles[] = [];

    [
      { name: ROLES.author, data: authors },
      { name: ROLES.implementer, data: implementers },
      { name: ROLES.responsible, data: responsibles },
      { name: ROLES.watcher, data: watchers },
    ].forEach((el) => {
      el.data.forEach((task_el) => {
        if (task_el.users.includes(authUserId || '')) {
          const taskRoleELem = findTaskRoleELem(resultRoles, task_el.task_id);
          if (taskRoleELem) {
            taskRoleELem.roles.push(el.name);
          } else {
            resultRoles.push({ task_id: task_el.task_id, roles: [el.name] });
          }
        }
      });
    });
    return resultRoles;
  },
);

export const getMyMaxRoleForAllTasks = createSelector(
  getMyRolesForAllTasks,
  (resultRoles): TasksMaxRole[] => {
    const resultMaxRoles: TasksMaxRole[] = [];

    resultRoles.forEach((task_el) => {
      switch (true) {
        case task_el.roles.includes(ROLES.author):
          resultMaxRoles.push({
            task_id: task_el.task_id,
            maxrole: ROLES.author,
          });
          break;
        case task_el.roles.includes(ROLES.responsible):
          resultMaxRoles.push({
            task_id: task_el.task_id,
            maxrole: ROLES.responsible,
          });
          break;
        case task_el.roles.includes(ROLES.implementer):
          resultMaxRoles.push({
            task_id: task_el.task_id,
            maxrole: ROLES.implementer,
          });
          break;
        case task_el.roles.includes(ROLES.watcher):
          resultMaxRoles.push({
            task_id: task_el.task_id,
            maxrole: ROLES.watcher,
          });
          break;
        default:
          resultMaxRoles.push({
            task_id: task_el.task_id,
            maxrole: ROLES.any,
          });
      }
    });
    return resultMaxRoles;
  },
);
